const express = require("express");
const router = express.Router();
const stripeController = require("../controllers/stripe.controller");

// Create Stripe customer
router.post("/create-customer", stripeController.createStripeCustomer);

// Create checkout session
router.post("/create-checkout-session", stripeController.createCheckoutSession);

// Webhook endpoint - no authentication needed as it's called by Stripe
router.post("/webhook", express.raw({ type: "application/json" }), stripeController.handleWebhook);

module.exports = router;
