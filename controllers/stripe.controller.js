const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { User } = require("../models");
const { SUBSCRIPTION_STATUS } = require("../constants");

//TODO: WILL CONVERT THE WHOLE CODE TO PROPER FORMATE ONCE IT STARTED WORING ON TEST MOOD

exports.checkout_session_post = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user.stripe_customer_id) {
      return res.fail("Stripe customer not found. Please contact support.");
    }

    const session = await stripe.checkout.sessions.create({
      customer: user.stripe_customer_id,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.FRONTEND_URL}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/subscription/cancel`,
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
        const deletedCustomer = await stripe.customers.retrieve(deletedSubscription.customer);
        const deletedUser = await User.findOne({ where: { stripe_customer_id: deletedCustomer.id } });

        if (deletedUser) {
          await deletedUser.update({ subscription_status: SUBSCRIPTION_STATUS.CANCELED });
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
