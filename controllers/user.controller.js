const userService = require("../services/user.service");
const joiSchemas = require("../validation/user.schemas");

module.exports.user_post = async (req, res) => {
  try {
    const results = await joiSchemas.local_signup_post.validateAsync(req.body);

    let foundUser = await userService.getUserByEmail(results.email);
    if (foundUser) {
      return res.fail("User with this email already exists");
    }

    const newUser = await userService.createUser(results);
    return res.success({
      message: "Account created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("UserController [createUser] Error:", error);
    return res.serverError(error);
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

module.exports.users_get = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const users = await userService.getAllUsers(parseInt(page), parseInt(limit));
    res.success(users);
  } catch (error) {
    console.error("UserController [getAllUsers] Error:", error);
    res.serverError(error);
  }
};
