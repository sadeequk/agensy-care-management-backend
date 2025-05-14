const userService = require("../services/user.service");
const cognitoService = require("../services/cognito.service");
const joiSchemas = require("../validation/user.schemas");
const { USER_ROLES, COGNITO_GROUPS } = require("../constants/index");

module.exports.user_signup = async (req, res) => {
  try {
    const results = await joiSchemas.local_signup_post.validateAsync(req.body);

    let foundUser = await userService.getUserByEmail(results.email);
    if (foundUser) {
      return res.fail("User with this email already exists");
    }

    const newUser = await userService.createUser({
      first_name: results.first_name,
      last_name: results.last_name,
      email: results.email,
      cognito_id: results.cognito_id,
      role: USER_ROLES.PRIMARY_USER,
    });

    return res.success(newUser);
  } catch (error) {
    console.error("UserController [createUser] Error:", error);
    return res.serverError(error);
  }
};

module.exports.user_login = async (req, res) => {
  try {
    if (!req.user) {
      return res.fail("User not found");
    }

    await cognitoService.addUserToGroup(req.user.email, COGNITO_GROUPS.PRIMARY_USERS);

    const updatedUser = await userService.updateUser(req.user.id, {
      email_verified: true,
      last_login: new Date(),
    });

    res.success(updatedUser);
  } catch (error) {
    console.error("UserController [login] Error:", error);
    res.serverError(error);
  }
};

module.exports.me_get = async (req, res) => {
  try {
    if (!req.user) {
      return res.fail("User not found");
    }
    res.success(req.user);
  } catch (error) {
    console.error("UserController [me] Error:", error);
    res.serverError(error);
  }
};
