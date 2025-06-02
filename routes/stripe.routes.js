const express = require("express");
const router = express.Router();
const verifyCognitoToken = require("../middlewares/auth.mw");
const stripeController = require("../controllers/stripe.controller");

router.post("/checkout-session", verifyCognitoToken, stripeController.checkout_session_post);
router.post("/webhook", stripeController.handleWebhook);
router.get("/session/:sessionId", verifyCognitoToken, stripeController.session_details_get);

module.exports = router;
