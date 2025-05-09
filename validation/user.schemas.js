const Joi = require("joi");

module.exports.local_signup_post = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  client_first_name: Joi.string().required(),
  client_last_name: Joi.string().required(),
  relation_with_client: Joi.string().required(),
  client_dob: Joi.string().required(),
  email: Joi.string().email().required(),
  cognito_id: Joi.string().required(),
});

module.exports.local_login_post = Joi.object({
  cognito_id: Joi.string().required(),
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
