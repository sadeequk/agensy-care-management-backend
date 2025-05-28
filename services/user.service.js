const { User } = require("../models/index");
const cognitoService = require("./cognito.service");
const clientService = require("./client.service");
const { sendLoginEmail } = require("../helpers/login.email.templete");
const { COGNITO_GROUPS, USER_ROLES } = require("../constants/index");
const { Client } = require("../models/index");

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

module.exports.createSubuser = ({ primaryUserId, clientId, subuserData }) =>
  new Promise(async (resolve, reject) => {
    try {
      // Create User on AWS Cognito
      const cognitoUser = await cognitoService.createCognitoUser({
        email: subuserData.email,
        first_name: subuserData.first_name,
        last_name: subuserData.last_name,
        email_verified: true,
      });

      // Set a password for Cognito User
      await cognitoService.setPermanentPassword({
        email: subuserData.email,
        password: subuserData.password,
      });

      // Assign Cognito group to user
      const groupName =
        subuserData.role === USER_ROLES.FAMILY_MEMBER ? COGNITO_GROUPS.FAMILY_MEMBERS : COGNITO_GROUPS.CAREGIVERS;
      await cognitoService.addUserToGroup(subuserData.email, groupName);

      // Create User on DB
      const user = await User.create({
        primary_user_id: primaryUserId,
        email: subuserData.email,
        cognito_id: cognitoUser.Username || cognitoUser.User?.Username,
        first_name: subuserData.first_name,
        last_name: subuserData.last_name,
        role: subuserData.role,
        email_verified: true,
        relation: subuserData.relation,
        phone: subuserData.phone,
        active: true,
      });
      const client = await clientService.getClientById(clientId);

      // Add User to Client and Client to User
      await user.addClient(client);
      await client.addUser(user);

      // Send welcome email
      // await sendLoginEmail(subuserData.email, {
      //   first_name: subuserData.first_name,
      //   tempPassword: subuserData.password,
      // });

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

module.exports.checkUserEmailForClient = (email, clientId) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        include: [
          {
            model: Client,
            where: { id: clientId },
            through: { attributes: [] }, // Don't include junction table attributes
          },
        ],
        where: { email },
      });

      if (user) {
        return resolve(true);
      }
      resolve(false);
    } catch (error) {
      console.error("UserService [checkUserEmailForClient] Error:", error);
      reject(error);
    }
  });
