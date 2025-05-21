const express = require("express");
const router = express.Router();
const verifyCognitoToken = require("../middlewares/auth.mw");
const setClientId = require("../middlewares/client.param.mw");
router.param("clientId", setClientId);

// router.param("clientId", (req, res, next, id) => {
//   req.clientId = id;
//   next();
// });

router.use("/users", require("./user.routes"));
router.use("/clients", verifyCognitoToken, require("./client.routes"));
router.use("/client/:clientId/contacts", verifyCognitoToken, require("./client.contact.routes"));
router.use("/client/:clientId/notes", verifyCognitoToken, require("./note.routes"));
router.use("/client/:clientId/medications", verifyCognitoToken, require("./client.medication.routes"));
router.use(
  "/client/:clientId/healthcare-providers",
  verifyCognitoToken,
  require("./client.healthcare.provider.routes")
);
router.use("/client/:clientId/medical", verifyCognitoToken, require("./client.medical.routes")); //singular
router.use("/client/:clientId/document-categories", verifyCognitoToken, require("./client.document.category.routes"));
router.use("/client/:clientId/documents", verifyCognitoToken, require("./client.document.routes"));
router.use("/general-documents", verifyCognitoToken, require("./general.document.routes"));

module.exports = router;
