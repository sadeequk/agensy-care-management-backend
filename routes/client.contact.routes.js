const express = require("express");
const router = express.Router();
const clientContactController = require("../controllers/client.contact.controller");

router.post("/", clientContactController.contact_post);
router.get("/", clientContactController.client_contacts_get);
router.get("/:contactId", clientContactController.contact_get);
router.put("/:contactId", clientContactController.contact_put);
router.delete("/:contactId", clientContactController.contact_delete);
router.put("/:contactId/status", clientContactController.status_put);

module.exports = router;
