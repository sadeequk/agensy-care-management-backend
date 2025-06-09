const userService = require("../services/user.service");
const cognitoService = require("../services/cognito.service");
const joiSchemas = require("../validation/user.schemas");
const { USER_ROLES, COGNITO_GROUPS, SUBSCRIPTION_STATUS } = require("../constants/index");
//
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports.user_signup = async (req, res) => {
  try {
    const results = await joiSchemas.local_signup_post.validateAsync(req.body);

    let foundUser = await userService.getUserByEmail(results.email);
    if (foundUser) {
      return res.fail("User with this email already exists");
    }

    //
    const customer = await stripe.customers.create({
      email: results.email,
      name: `${results.first_name} ${results.last_name}`,
      metadata: {
        source: "agensy-app",
      },
    });

    //
    const newUser = await userService.createUser({
      first_name: results.first_name,
      last_name: results.last_name,
      email: results.email,
      cognito_id: results.cognito_id,
      role: USER_ROLES.PRIMARY_USER,
      //
      stripe_customer_id: customer.id,
      subscription_status: SUBSCRIPTION_STATUS.INACTIVE,
      //
    });

    await cognitoService.addUserToGroup(results.email, COGNITO_GROUPS.PRIMARY_USERS);

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

    const updatedUser = await userService.updateUser(req.user.id, {
      email_verified: true,
      last_login: new Date(),
    });

    if (updatedUser.role != USER_ROLES.PRIMARY_USER) {
      const primaryUser = await userService.getUserById(updatedUser.primary_user_id);
      if (primaryUser) {
        updatedUser.dataValues.subscription_status = primaryUser.subscription_status;
      }
    }

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

    if (req.user.role != USER_ROLES.PRIMARY_USER) {
      const primaryUser = await userService.getUserById(req.user.primary_user_id);
      if (primaryUser) {
        req.user.dataValues.subscription_status = primaryUser.subscription_status;
      }
    }

    res.success(req.user);
  } catch (error) {
    console.error("UserController [me] Error:", error);
    res.serverError(error);
  }
};

module.exports.subuser_post = async (req, res) => {
  try {
    const results = await joiSchemas.subuser_post.validateAsync(req.body);

    let foundUser = await userService.getUserByEmail(results.email);
    if (foundUser) return res.fail("User with this email already exists");

    // const exists = await userService.checkUserEmailForClient(results.email, req.clientId);
    // if (exists) {
    //   return res.fail("User with this email is already associated with this client");
    // }

    const newUser = await userService.createSubuser({
      primaryUserId: req.user.id,
      clientId: req.clientId,
      subscription_status: SUBSCRIPTION_STATUS.INACTIVE,
      subuserData: results,
    });

    return res.success(newUser);
  } catch (error) {
    console.error("UserController [create_subuser] Error:", error);
    return res.serverError(error);
  }
};

module.exports.subuser_delete = async (req, res) => {
  try {
    const primaryUserId = req.user.id;
    const subuserId = req.params.subuserId;
    await userService.deleteSubuser(primaryUserId, subuserId);
    res.success({ message: "Subuser deleted successfully" });
  } catch (error) {
    console.error("UserController [delete_subuser] Error:", error);
    res.serverError(error);
  }
};

module.exports.subuser_put = async (req, res) => {
  try {
    const results = await joiSchemas.subuser_put.validateAsync(req.body);
    const subuserId = req.params.subuserId;

    const updatedSubuser = await userService.updateUser(subuserId, {
      first_name: results.first_name,
      last_name: results.last_name,
      relation: results.relation,
      role: results.role,
      phone: results.phone,
    });

    res.success(updatedSubuser);
  } catch (error) {
    console.error("UserController [edit_subuser] Error:", error);
    res.serverError(error);
  }
};

// module.exports.related_users_get = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const users = await userService.getRelatedUsers(userId);
//     res.success(users);
//   } catch (error) {
//     console.error("UserController [related_users_get] Error:", error);
//     res.serverError(error);
//   }
// };

module.exports.related_users_get = async (req, res) => {
  try {
    const clientId = req.clientId;
    const userId = req.user.id;
    const relatedUsers = await userService.getRelatedUsers(userId, clientId);
    res.success(relatedUsers);
  } catch (error) {
    console.error("UserController [related_users_get] Error:", error);
    res.serverError(error);
  }
};
