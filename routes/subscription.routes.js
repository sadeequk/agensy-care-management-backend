const express = require("express");
const router = express.Router();
const verifyCognitoToken = require("../middlewares/auth.mw");
const subscriptionController = require("../controllers/subscription.controller");

router.post("/checkout-session", verifyCognitoToken, subscriptionController.checkout_session_post);
router.post("/webhook", subscriptionController.handleWebhook);
router.get("/session/:sessionId", verifyCognitoToken, subscriptionController.session_details_get);
router.get("/:subscriptionId", verifyCognitoToken, subscriptionController.download_invoice_get);
router.get("/history", verifyCognitoToken, subscriptionController.subscription_history_get);
router.post("/cancel", verifyCognitoToken, subscriptionController.cancel_subscription_post);

module.exports = router;
