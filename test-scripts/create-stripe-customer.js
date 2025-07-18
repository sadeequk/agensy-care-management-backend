require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { User } = require("../models");

// const email = "bw8051116@gmail.com";
const email = "hinivo1852@besibali.com";

async function createStripeCustomer() {
  try {
    const user = await User.findOne({ where: { email } });
    if (user.stripe_customer_id) {
      console.log("User already has a Stripe customer ID:", user.stripe_customer_id);
      return;
    }
    const customer = await stripe.customers.create({
      email: user.email,
      name: `${user.first_name} ${user.last_name}`,
      metadata: {
        source: "agensy-app",
      },
    });
    await user.update({
      stripe_customer_id: customer.id,
    });

    console.log("Successfully created Stripe customer:", {
      email: user.email,
      stripe_customer_id: customer.id,
    });
  } catch (error) {
    console.error("Error creating Stripe customer:", error);
  }
}

createStripeCustomer();
