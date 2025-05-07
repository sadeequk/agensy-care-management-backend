const Joi = require('joi');

module.exports.local_signup_post = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().required(),
});

module.exports.local_login_post = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().messages({
    'string.base': 'Password is required.',
    'string.empty': 'Password cannot be empty.',
  }),
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
