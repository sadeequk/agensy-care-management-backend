// const { User } = require("../models");

// exports.updateProfile = (userId, data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const user = await User.findByPk(userId);
//       const updatedUser = await user.update({
//         ...data,
//       });
//       await updatedUser.save();
//       resolve(updatedUser);
//     } catch (error) {
//       console.error("UserProfileService [updateProfile] Error:", error);
//       reject(error);
//     }
//   });
// };
