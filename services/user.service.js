const { User } = require("../models/index");

module.exports.createUser = (userData) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await User.create(userData);
      resolve(user);
    } catch (error) {
      console.error("UserService [createUser] Error:", error);
      reject(error);
    }
  });

module.exports.getUserByEmail = (email) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ where: { email } });
      resolve(user);
    } catch (error) {
      console.error("UserService [getUserByEmail] Error:", error);
      reject(error);
    }
  });

module.exports.updateUser = (id, userData) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return reject(new Error("User not found"));
      }
      await user.update(userData);
      await user.reload();
      resolve(user);
    } catch (error) {
      console.error("UserService [updateUser] Error:", error);
      reject(error);
    }
  });

module.exports.getUserByCognitoId = (cognito_id) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ where: { cognito_id } });
      resolve(user);
    } catch (error) {
      console.error("UserService [getUserByCognitoId] Error:", error);
      reject(error);
    }
  });
