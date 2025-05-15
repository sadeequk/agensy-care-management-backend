const express = require("express");
const router = express.Router();
const clientContactController = require("../controllers/client.contact.controller");
const verifyCognitoToken = require("../middlewares/auth.mw");

router.post("/:id", verifyCognitoToken, clientContactController.contact_post); //client id
router.get("/single-contact/:id", verifyCognitoToken, clientContactController.contact_get); //contact id
router.get("/all-by-client/:id", verifyCognitoToken, clientContactController.client_contacts_get); //client id
router.put("/:id", verifyCognitoToken, clientContactController.contact_put); //contact id
router.delete("/:id", verifyCognitoToken, clientContactController.contact_delete); //contact id

// router.put("/status/:id", verifyCognitoToken, clientContactController.status_put); //contact id

module.exports = router;
