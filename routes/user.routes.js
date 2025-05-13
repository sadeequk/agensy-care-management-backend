const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const verifyCognitoToken = require("../middlewares/auth.mw");

router.post("/signup", userController.user_signup);
router.post("/login", verifyCognitoToken, userController.user_login);
// router.get("/:id", userController.user_get);
// router.put("/:id", userController.user_put);
// router.delete("/:id", userController.user_delete);
router.get("/me", verifyCognitoToken, userController.me_get);

module.exports = router;
