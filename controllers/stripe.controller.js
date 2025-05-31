const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { User } = require("../models");
const userService = require("../services/user.service");
const { SUBSCRIPTION_STATUS } = require("../constants");

// Create a Stripe customer when user signs up
exports.createStripeCustomer = async (req, res) => {
  try {
    const { email, first_name, last_name } = req.body;

    // Create a customer in Stripe
    const customer = await stripe.customers.create({
      email,
      name: `${first_name} ${last_name}`,
      metadata: {
        source: "agensy-app",
      },
    });

    // Update user with Stripe customer ID
    const user = await userService.updateUser(req.user.id, {
      stripe_customer_id: customer.id,
    });

    return res.success(user);
  } catch (error) {
    console.error("StripeController [createStripeCustomer] Error:", error);
    return res.serverError(error);
  }
};

// Create a checkout session for subscription
exports.createCheckoutSession = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user.stripe_customer_id) {
      return res.fail("Stripe customer not found. Please contact support.");
    }

    const session = await stripe.checkout.sessions.create({
      customer: user.stripe_customer_id,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID, // Your monthly subscription price ID
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

// Handle Stripe webhooks
exports.handleWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
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

    return res.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return res.status(500).json({ error: "Webhook processing failed" });
  }
};
