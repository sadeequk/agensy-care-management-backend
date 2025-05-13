const Joi = require("joi");
const { USER_ROLES } = require("../constants/user");

module.exports.local_signup_post = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  cognito_id: Joi.string().required(),
  role: Joi.string()
    .valid(USER_ROLES.PRIMARY_USER, USER_ROLES.FAMILY_MEMBER, USER_ROLES.CAREGIVER, USER_ROLES.ADMIN)
    .default(USER_ROLES.PRIMARY_USER),
});

module.exports.change_password_post = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});

module.exports.forgot_password_post = Joi.object({
  email: Joi.string().email().required(),
});

module.exports.reset_password_post = Joi.object({
  email: Joi.string().email().required(),
  forgotPasswordCode: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});

module.exports.single_user_get = Joi.object({
  id: Joi.string().uuid().required(),
});

module.exports.single_user_delete = Joi.object({
  id: Joi.string().uuid().required(),
});
