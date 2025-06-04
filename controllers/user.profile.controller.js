const userProfileService = require("../services/user.profile.service");
const joiSchemas = require("../validation/user.profile.schemas");
const userService = require("../services/user.service");
const { USER_ROLES } = require("../constants");

exports.user_profile_put = async (req, res) => {
  try {
    const results = await joiSchemas.profile_put.validateAsync(req.body);
    const user = await userProfileService.updateProfile(req.user.id, results);
    if (user.role !== USER_ROLES.PRIMARY_USER && user.primary_user_id) {
      const primaryUser = await userService.getUserById(user.primary_user_id);
      if (primaryUser) {
        user.dataValues.subscription_status = primaryUser.subscription_status;
      }
    }
    res.success(user);
  } catch (error) {
    console.error("UserProfileController [ser_profile_put] Error:", error);
    res.serverError(error);
  }
};

exports.avatar_put = async (req, res) => {
  try {
    const data = {
      avatar_url: req.uploadedAvatar,
    };
    const updatedUser = await userProfileService.updateUserAvatar(req.user.id, data);
    if (updatedUser.role !== USER_ROLES.PRIMARY_USER && updatedUser.primary_user_id) {
      const primaryUser = await userService.getUserById(updatedUser.primary_user_id);
      if (primaryUser) {
        updatedUser.dataValues.subscription_status = primaryUser.subscription_status;
      }
    }

    res.success(updatedUser);
  } catch (error) {
    console.error("UserProfileController [avatar_put] Error:", error);
    res.serverError(error);
  }
};

exports.avatar_delete = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userProfileService.removeUserAvatar(userId);
    res.success(user);
  } catch (error) {
    console.error("UserProfileController [avatar_delete] Error:", error);
    res.serverError(error);
  }
};
