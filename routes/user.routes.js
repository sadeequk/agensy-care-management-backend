const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// User routes
router.post("/", userController.user_post);
router.get("/", userController.users_get);
router.get("/:id", userController.user_get);
router.put("/:id", userController.user_put);
router.delete("/:id", userController.user_delete);

module.exports = router;
