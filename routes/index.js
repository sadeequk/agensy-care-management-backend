const express = require("express");
const router = express.Router();

router.use("/user", require("./user.routes"));
router.use("/client", require("./client.routes"));
router.use("/client-contact", require("./client.contact.routes"));
module.exports = router;
