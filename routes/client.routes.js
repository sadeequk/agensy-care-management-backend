const express = require("express");
const router = express.Router();
const clientController = require("../controllers/client.controller");

router.post("/", clientController.client_post);
router.put("/:clientId", clientController.client_put);
router.put("/:clientId/status", clientController.status_put);
router.put("/:clientId/hospital-pharmacy", clientController.hospital_pharmacy_put);
router.get("/:clientId", clientController.client_get);
router.get("/", clientController.clients_get);

module.exports = router;
