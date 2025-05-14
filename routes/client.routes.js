const express = require("express");
const router = express.Router();
const clientController = require("../controllers/client.controller");
const verifyCognitoToken = require("../middlewares/auth.mw");

router.post("/", verifyCognitoToken, clientController.client_post);
router.put("/:id", verifyCognitoToken, clientController.client_put); ///client id
router.put("/status/:id", verifyCognitoToken, clientController.status_put);
router.get("/:id", verifyCognitoToken, clientController.client_get);
router.get("/", verifyCognitoToken, clientController.clients_get);

module.exports = router;
// module.exports = router;
// module.exports = router;
// module.exports = router;
// module.exports = router;
