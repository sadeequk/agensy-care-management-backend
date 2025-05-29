// const userProfileService = require("../services/user.profile.service");
// const joiSchemas = require("../validation/user.profile.schemas");

// exports.user_profile_put = async (req, res) => {
//   try {
//     const results = await joiSchemas.profile_put.validateAsync(req.body);
//     await userProfileService.updateProfile(req.user.id, results);
//     res.success("Profile updated successfully");
//   } catch (error) {
//     console.error("UserProfileController [ser_profile_put] Error:", error);
//     res.serverError(error);
//   }
// };
