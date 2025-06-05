const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { User } = require("../models");
const { SUBSCRIPTION_STATUS } = require("../constants");

exports.checkout_session_post = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user.stripe_customer_id) {
      return res.fail("Stripe customer not found. Please contact support.");
    }

    const session = await stripe.checkout.sessions.create({
      customer: user.stripe_customer_id,
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.FRONTEND_URL}/billing/payment-status/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/billing/payment-status/`,
    });

    return res.success({ url: session.url });
  } catch (error) {
    console.error("StripeController [createCheckoutSession] Error:", error);
    return res.serverError(error);
  }
};

exports.handleWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.fail("Webhook signature verification failed");
  }

  try {
    switch (event.type) {
      case "invoice.payment_succeeded":
        const invoice = event.data.object;
        const customer = await stripe.customers.retrieve(invoice.customer);
        const user = await User.findOne({ where: { stripe_customer_id: customer.id } });

        if (user) {
          await user.update({ subscription_status: SUBSCRIPTION_STATUS.ACTIVE });
        }
        break;

      case "invoice.payment_failed":
        const failedInvoice = event.data.object;
        const failedCustomer = await stripe.customers.retrieve(failedInvoice.customer);
        const failedUser = await User.findOne({ where: { stripe_customer_id: failedCustomer.id } });

        if (failedUser) {
          await failedUser.update({ subscription_status: SUBSCRIPTION_STATUS.INACTIVE });
        }
        break;

      case "customer.subscription.updated":
        const subscription = event.data.object;
        const updatedCustomer = await stripe.customers.retrieve(subscription.customer);
        const updatedUser = await User.findOne({ where: { stripe_customer_id: updatedCustomer.id } });

        if (updatedUser) {
          await updatedUser.update({
            subscription_status:
              subscription.status === "active" ? SUBSCRIPTION_STATUS.ACTIVE : SUBSCRIPTION_STATUS.INACTIVE,
          });
        }
        break;

      case "customer.subscription.deleted":
        const deletedSubscription = event.data.object;
        // const deletedCustomer = await stripe.customers.retrieve(deletedSubscription.customer);
        const deletedUser = await User.findOne({ where: { stripe_customer_id: deletedSubscription.customer } });

        if (deletedUser) {
          await deletedUser.update({ subscription_status: SUBSCRIPTION_STATUS.INACTIVE });
        }
        break;
    }
    return res.success({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return res.serverError(error);
  }
};

exports.session_details_get = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return res.success(session);
  } catch (error) {
    console.error("StripeController [getSessionDetails] Error:", error);
    return res.serverError(error);
  }
};

exports.download_invoice_get = async (req, res) => {
  try {
    const { subscriptionId } = req.params;
    const user = await User.findByPk(req.user.id);

    if (!user.stripe_customer_id) {
      return res.fail("Stripe customer not found");
    }

    // Get the subscription to verify it belongs to the user
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    if (subscription.customer !== user.stripe_customer_id) {
      return res.fail("Subscription not found");
    }

    // Get the latest invoice for this subscription
    const invoice = await stripe.invoices.retrieve(subscription.latest_invoice);

    // Get the PDF URL
    const pdfUrl = invoice.invoice_pdf;

    if (!pdfUrl) {
      return res.fail("Invoice PDF not available");
    }

    return res.success({
      download_url: pdfUrl,
    });
  } catch (error) {
    console.error("Error getting invoice URL:", error);
    return res.serverError(error);
  }
};

exports.cancel_subscription_post = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.fail("User not found");
    }
    ////
    if (!user.stripe_customer_id) {
      return res.fail("Stripe customer not found");
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: user.stripe_customer_id,
      status: "active",
      limit: 1,
    });

    if (!subscriptions.data.length) {
      return res.fail("No active subscription found");
    }

    const subscriptionId = subscriptions.data[0].id;

    await stripe.subscriptions.cancel(subscriptionId);

    return res.success({
      message: "Subscription canceled successfully.",
    });
  } catch (error) {
    console.error("Error canceling subscription:", error);
    return res.serverError(error);
  }
};

exports.subscription_history_get = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    const subscriptions = await stripe.subscriptions.list({
      customer: user.stripe_customer_id,
      status: "all",
      expand: ["data.default_payment_method"],
      limit: 100,
    });

    // Get detailed information for each subscription
    const subscriptionHistory = await Promise.all(
      subscriptions.data.map(async (sub) => {
        // Get full subscription details
        const subscription = await stripe.subscriptions.retrieve(sub.id, {
          expand: ["default_payment_method"],
        });

        let paymentMethod = null;
        if (subscription.default_payment_method && subscription.default_payment_method.card) {
          paymentMethod = {
            type: subscription.default_payment_method.type,
            last4: subscription.default_payment_method.card.last4,
            brand: subscription.default_payment_method.card.brand,
            exp_month: subscription.default_payment_method.card.exp_month,
            exp_year: subscription.default_payment_method.card.exp_year,
          };
        }

        return {
          id: subscription.id,
          status: subscription.status,
          current_period_start: subscription.items.data[0].current_period_start
            ? new Date(subscription.items.data[0].current_period_start * 1000).toISOString()
            : null,
          current_period_end: subscription.items.data[0].current_period_end
            ? new Date(subscription.items.data[0].current_period_end * 1000).toISOString()
            : null,
          cancel_at_period_end: subscription.cancel_at_period_end,
          amount: subscription.items.data[0].price.unit_amount / 100,
          currency: subscription.currency,
          payment_method: subscription.default_payment_method
            ? {
                type: subscription.default_payment_method.type,
                last4: subscription.default_payment_method.card.last4,
                brand: subscription.default_payment_method.card.brand,
                exp_month: subscription.default_payment_method.card.exp_month,
                exp_year: subscription.default_payment_method.card.exp_year,
              }
            : null,
          latest_invoice: subscription.latest_invoice,
        };
      })
    );

    return res.success(subscriptionHistory);
  } catch (error) {
    console.error("Error getting subscription history:", error);
    return res.serverError(error);
  }
};
