const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/", userController.subuser_post);
router.delete("/:subuserId", userController.subuser_delete);
router.put("/:subuserId", userController.subuser_put);
router.get("/", userController.related_users_get);

module.exports = router;
