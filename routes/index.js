const express = require("express");
const router = express.Router();

router.use("/user", require("./user.routes"));
router.use("/client", require("./client.routes"));
router.use("/client-contact", require("./client.contact.routes"));
router.use("/notes", require("./note.routes"));
router.use("/client-medications", require("./client.medication.routes"));

module.exports = router;
