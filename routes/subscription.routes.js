const express = require("express");
const router = express.Router();
const verifyCognitoToken = require("../middlewares/auth.mw");
const subscriptionController = require("../controllers/subscription.controller");

router.post("/checkout-session", verifyCognitoToken, subscriptionController.checkout_session_post);
router.post("/webhook", subscriptionController.handleWebhook);
router.get("/session/:sessionId", verifyCognitoToken, subscriptionController.session_details_get);
router.get("/invoice/:invoiceId", verifyCognitoToken, subscriptionController.download_invoice_get);
// router.get("/subscription", verifyCognitoToken, subscriptionController.subscription_details_get);
// router.get("/payments", verifyCognitoToken, subscriptionController.payment_history_get);

module.exports = router;
