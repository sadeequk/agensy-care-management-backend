const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/", userController.subuser_post);
router.delete("/:subuserId", userController.subuser_delete);
router.put("/:subuserId", userController.subuser_put);

module.exports = router;
