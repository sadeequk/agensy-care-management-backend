const userProfileService = require("../services/user.profile.service");
const joiSchemas = require("../validation/user.profile.schemas");

exports.user_profile_put = async (req, res) => {
  try {
    const results = await joiSchemas.profile_put.validateAsync(req.body);
    const user = await userProfileService.updateProfile(req.user.id, results);
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
