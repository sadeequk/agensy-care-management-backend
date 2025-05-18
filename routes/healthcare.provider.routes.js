const express = require("express");
const router = express.Router();
const HealthcareProviderController = require("../controllers/healthcare.provider.controller");
const verifyCognitoToken = require("../middlewares/auth.mw");

router.post("/:id", verifyCognitoToken, HealthcareProviderController.provider_post); //client id
router.get("/:id", verifyCognitoToken, HealthcareProviderController.providers_get); //client id
router.get("/single/:id", verifyCognitoToken, HealthcareProviderController.provider_get); //get specific provider
router.put("/:id", verifyCognitoToken, HealthcareProviderController.provider_put); //update specific provider
router.delete("/:id", verifyCognitoToken, HealthcareProviderController.provider_delete); //provider id
router.put("/status/:id", verifyCognitoToken, HealthcareProviderController.provider_status_put); //provider id

module.exports = router;
