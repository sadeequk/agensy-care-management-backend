const express = require("express");
const router = express.Router();
const HealthcareProviderController = require("../controllers/healthcare.provider.controller");

router.post("/", HealthcareProviderController.provider_post);
router.get("/", HealthcareProviderController.providers_get);
router.get("/:healthCareProviderId", HealthcareProviderController.provider_get);
router.put("/:healthCareProviderId", HealthcareProviderController.provider_put);
router.delete("/:healthCareProviderId", HealthcareProviderController.provider_delete);
router.put("/:healthCareProviderId/:status", HealthcareProviderController.provider_status_put);

module.exports = router;
