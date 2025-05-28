const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/", userController.subuser_post);

module.exports = router;
