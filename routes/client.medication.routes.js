const express = require("express");
const router = express.Router();
const ClientMedicationController = require("../controllers/client.medication.controller");
const verifyCognitoToken = require("../middlewares/auth.mw");

router.post("/:id", verifyCognitoToken, ClientMedicationController.client_medication_post); //client id
router.get("/:id", verifyCognitoToken, ClientMedicationController.client_medications_get); //client id
router.get("/single/:id", verifyCognitoToken, ClientMedicationController.client_medication_get); //get specific medication
router.put("/:id", verifyCognitoToken, ClientMedicationController.client_medication_put); //update specific medication
router.delete("/:id", verifyCognitoToken, ClientMedicationController.client_medication_delete); //medication id
router.put("/status/:id", verifyCognitoToken, ClientMedicationController.client_medication_status_put); //medication id

module.exports = router;
