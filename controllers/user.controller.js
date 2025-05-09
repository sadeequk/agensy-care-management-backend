const userService = require("../services/user.service");
const clientService = require("../services/client.service");
const joiSchemas = require("../validation/user.schemas");

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
    });

    // const newClient = await clientService.createClient({
    await clientService.createClient({
      first_name: results.client_first_name,
      last_name: results.client_last_name,
      relation: results.relation_with_client,
      date_of_birth: results.client_dob,
      primary_user_id: newUser.id,
    });

    return res.success(newUser);
  } catch (error) {
    console.error("UserController [createUser] Error:", error);
    return res.serverError(error);
  }
};

module.exports.user_login = async (req, res) => {
  try {
    const results = await joiSchemas.local_login_post.validateAsync(req.body);

    const user = await userService.getUserByCognitoId(results.cognito_id);
    if (!user) {
      return res.fail("User not found");
    }

    const updatedUser = await userService.updateUser(user.id, {
      email_verified: true,
      last_login: new Date(),
    });

    res.success(updatedUser);
  } catch (error) {
    console.error("UserController [login] Error:", error);
    res.serverError(error);
  }
};

module.exports.user_get = async (req, res) => {
  try {
    const { id } = await joiSchemas.single_user_get.validateAsync(req.params);
    const user = await userService.getUserById(id);
    if (!user) {
      return res.fail("User not found");
    }
    res.success(user);
  } catch (error) {
    console.error("UserController [getUserById] Error:", error);
    res.serverError(error);
  }
};

module.exports.user_put = async (req, res) => {
  try {
    const { id } = await joiSchemas.single_user_get.validateAsync(req.params);
    const user = await userService.updateUser(id, req.body);
    res.success(user);
  } catch (error) {
    console.error("UserController [updateUser] Error:", error);
    res.serverError(error);
  }
};

module.exports.user_delete = async (req, res) => {
  try {
    const { id } = await joiSchemas.single_user_delete.validateAsync(req.params);
    await userService.deleteUser(id);
    res.success({ message: "User deleted successfully" });
  } catch (error) {
    console.error("UserController [deleteUser] Error:", error);
    res.serverError(error);
  }
};

module.exports.me_get = async (req, res) => {
  try {
    const cognito_id = req.user.sub;
    const user = await userService.getUserByCognitoId(cognito_id);
    if (!user) {
      return res.fail("User not found");
    }
    res.success(user);
  } catch (error) {
    console.error("UserController [me] Error:", error);
    res.serverError(error);
  }
};
