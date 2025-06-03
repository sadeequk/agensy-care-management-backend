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

exports.download_invoice_get = async (req, res) => {
  try {
    const { invoiceId } = req.params;

    const invoice = await stripe.invoices.retrieve(invoiceId);
    const user = await User.findOne({ where: { stripe_customer_id: invoice.customer } });

    const pdf = await stripe.invoices.retrievePdf(invoiceId);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="invoice-${invoiceId}.pdf"`);

    res.send(pdf);
  } catch (error) {
    console.error("StripeController [downloadInvoice] Error:", error);
    return res.serverError(error);
  }
};

// exports.subscription_details_get = async (req, res) => {
//   try {
//     const user = await User.findByPk(req.user.id);

//     if (!user.stripe_customer_id) {
//       return res.fail("Stripe customer not found");
//     }

//     const subscriptions = await stripe.subscriptions.list({
//       customer: user.stripe_customer_id,
//       status: "active",
//       expand: ["data.default_payment_method"],
//     });

//     if (!subscriptions.data.length) {
//       return res.fail("No active subscription found");
//     }

//     const subscription = subscriptions.data[0];

//     const upcomingInvoice = await stripe.invoices.retrieveUpcoming({
//       customer: user.stripe_customer_id,
//       subscription: subscription.id,
//     });

//     const subscriptionDetails = {
//       id: subscription.id,
//       status: subscription.status,
//       current_period_start: new Date(subscription.current_period_start * 1000),
//       current_period_end: new Date(subscription.current_period_end * 1000),
//       cancel_at_period_end: subscription.cancel_at_period_end,
//       next_billing_date: new Date(upcomingInvoice.next_payment_attempt * 1000),
//       amount: subscription.items.data[0].price.unit_amount / 100,
//       currency: subscription.currency,
//       payment_method: subscription.default_payment_method
//         ? {
//             type: subscription.default_payment_method.type,
//             last4: subscription.default_payment_method.card.last4,
//             brand: subscription.default_payment_method.card.brand,
//             exp_month: subscription.default_payment_method.card.exp_month,
//             exp_year: subscription.default_payment_method.card.exp_year,
//           }
//         : null,
//     };

//     return res.success(subscriptionDetails);
//   } catch (error) {
//     console.error("StripeController [getSubscriptionDetails] Error:", error);
//     return res.serverError(error);
//   }
// };

// exports.payment_history_get = async (req, res) => {
//   try {
//     const user = await User.findByPk(req.user.id);

//     if (!user.stripe_customer_id) {
//       return res.fail("Stripe customer not found");
//     }

//     const charges = await stripe.charges.list({
//       customer: user.stripe_customer_id,
//       limit: 10,
//       status: "succeeded",
//     });

//     const invoices = await stripe.invoices.list({
//       customer: user.stripe_customer_id,
//       limit: 10,
//       status: "paid",
//     });

//     const paymentHistory = {
//       charges: charges.data.map((charge) => ({
//         id: charge.id,
//         amount: charge.amount / 100,
//         currency: charge.currency,
//         status: charge.status,
//         created: new Date(charge.created * 1000),
//         payment_method: charge.payment_method_details?.card
//           ? {
//               brand: charge.payment_method_details.card.brand,
//               last4: charge.payment_method_details.card.last4,
//             }
//           : null,
//       })),
//       invoices: invoices.data.map((invoice) => ({
//         id: invoice.id,
//         number: invoice.number,
//         amount_paid: invoice.amount_paid / 100,
//         currency: invoice.currency,
//         status: invoice.status,
//         created: new Date(invoice.created * 1000),
//         period_start: new Date(invoice.period_start * 1000),
//         period_end: new Date(invoice.period_end * 1000),
//         pdf_url: invoice.invoice_pdf,
//       })),
//     };

//     return res.success(paymentHistory);
//   } catch (error) {
//     console.error("StripeController [getPaymentHistory] Error:", error);
//     return res.serverError(error);
//   }
// };

exports.cancel_subscription_post = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.fail("User not found");
    }

    await user.update({
      subscription_status: SUBSCRIPTION_STATUS.INACTIVE,
    });

    return res.success({
      message: "Subscription canceled successfully",
      subscription_status: user.subscription_status,
    });
  } catch (error) {
    console.error("Error canceling subscription:", error);
    return res.serverError(error);
  }
};
