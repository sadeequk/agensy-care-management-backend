const express = require("express");
const router = express.Router();
const ClientMedicationController = require("../controllers/client.medication.controller");

router.post("/", ClientMedicationController.client_medication_post);
router.get("/", ClientMedicationController.client_medications_get);
router.get("/:medicationId", ClientMedicationController.client_medication_get);
router.put("/:medicationId", ClientMedicationController.client_medication_put);
router.delete("/:medicationId", ClientMedicationController.client_medication_delete);
router.put("/:medicationId/status", ClientMedicationController.client_medication_status_put);

module.exports = router;
