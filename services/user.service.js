const { User } = require("../models/index");
const cognitoService = require("./cognito.service");
const { sendWelcomeEmail } = require("../helpers/welcomeEmailTemplate");
const { COGNITO_GROUPS, USER_ROLES } = require("../constants/index");

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

module.exports.getUserById = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await User.findByPk(id);
      resolve(user);
    } catch (error) {
      console.error("UserService [getUserById] Error:", error);
      reject(error);
    }
  });

module.exports.createSubuser = (primaryUserId, subuserData) =>
  new Promise(async (resolve, reject) => {
    try {
      // 1. Create user in Cognito with email_verified true
      const cognitoUser = await cognitoService.createCognitoUser({
        email: subuserData.email,
        first_name: subuserData.first_name,
        last_name: subuserData.last_name,
        email_verified: true,
      });

      // 2. Set permanent password from frontend (no temp password)
      if (subuserData.password) {
        await cognitoService.setPermanentPassword({
          email: subuserData.email,
          password: subuserData.password,
        });
      }

      // 3. Determine group name and fromName based on role
      let groupName;
      if (subuserData.role === USER_ROLES.FAMILY_MEMBER) {
        groupName = COGNITO_GROUPS.FAMILY_MEMBERS;
      } else if (subuserData.role === USER_ROLES.CAREGIVER) {
        groupName = COGNITO_GROUPS.CAREGIVERS;
      } else if (subuserData.role === USER_ROLES.ADMIN) {
        groupName = COGNITO_GROUPS.ADMINS;
      } else {
        groupName = COGNITO_GROUPS.FAMILY_MEMBERS;
      }

      // 4. Add user to Cognito group (create if not exists)
      await cognitoService.addUserToGroup(subuserData.email, groupName);

      // 5. Create user in DB
      const user = await User.create({
        primary_user_id: primaryUserId,
        email: subuserData.email,
        cognito_id: cognitoUser.Username || cognitoUser.User?.Username,
        first_name: subuserData.first_name,
        last_name: subuserData.last_name,
        role: subuserData.role,
        email_verified: true,
        relation: subuserData.relation,
        active: true,
      });

      // 6. Output credentials for testing
      // console.log("Subuser created:", {
      //   email: subuserData.email,
      //   loginUrl: process.env.LOGIN_URL,
      // });

      // 7. Send welcome email
      // await sendWelcomeEmail(subuserData.email, {
      //   first_name: subuserData.first_name,
      //   loginUrl: process.env.LOGIN_URL,
      // });
      // console.log("Welcome email sent to", subuserData.email);

      resolve(user);
    } catch (error) {
      console.error("UserService [createSubuser] Error:", error);
      reject(error);
    }
  });

module.exports.deleteSubuser = async (primaryUserId, subuserId) => {
  try {
    const subuser = await User.findOne({
      where: {
        id: subuserId,
        primary_user_id: primaryUserId,
      },
    });

    await cognitoService.deleteCognitoUser(subuser.email);

    //will add related tables in future
    await subuser.destroy();

    return true;
  } catch (error) {
    console.error("UserService [deleteSubuser] Error:", error);
    throw error;
  }
};
