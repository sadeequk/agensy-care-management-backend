const { User } = require("../models");
const { deleteAvatar } = require("../helpers/aws.s3");

exports.updateProfile = (userId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findByPk(userId);
      const updatedUser = await user.update({
        ...data,
      });
      await updatedUser.save();
      resolve(updatedUser);
    } catch (error) {
      console.error("UserProfileService [updateProfile] Error:", error);
      reject(error);
    }
  });
};

exports.updateUserAvatar = async (userId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findByPk(userId);
      if (user.avatar) {
        await deleteAvatar(user.avatar);
      }

      await User.update({ avatar: data.avatar_url }, { where: { id: userId } });
      const updatedUser = await User.findByPk(userId);
      resolve(updatedUser);
    } catch (error) {
      console.error("UserProfileService [updateUserAvatar] Error:", error);
      reject(error);
    }
  });
};

exports.removeUserAvatar = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findByPk(userId);
      if (user.avatar) {
        await deleteAvatar(user.avatar);
      }
      await User.update({ avatar: null }, { where: { id: userId } });
      const updatedUser = await User.findByPk(userId);
      resolve(updatedUser);
    } catch (error) {
      console.error("UserProfileService [removeUserAvatar] Error:", error);
      reject(error);
    }
  });
};
