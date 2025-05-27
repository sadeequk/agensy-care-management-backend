const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const verifyCognitoToken = require("../middlewares/auth.mw");

router.post("/signup", userController.user_signup);
router.post("/login", verifyCognitoToken, userController.user_login);
router.get("/me", verifyCognitoToken, userController.me_get);
router.post("/", verifyCognitoToken, userController.subuser_Post);
router.delete("/:subuserId", verifyCognitoToken, userController.subuser_delete);

module.exports = router;
