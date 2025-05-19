const express = require("express");
const router = express.Router();
const ClientMedicalController = require("../controllers/client.medical.controller");

router.post("/", ClientMedicalController.medical_post);
router.get("/", ClientMedicalController.medical_get);
router.put("/", ClientMedicalController.medical_put);
router.delete("/", ClientMedicalController.medical_delete);

module.exports = router;
