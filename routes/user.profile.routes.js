const express = require("express");
const router = express.Router();
const userProfileController = require("../controllers/user.profile.controller");
const { uploadAvatar } = require("../helpers/aws.s3");

router.put("/", userProfileController.user_profile_put);
router.put("/avatar", uploadAvatar, userProfileController.avatar_put);
router.delete("/avatar", userProfileController.avatar_delete);

module.exports = router;
