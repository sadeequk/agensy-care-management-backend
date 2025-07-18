const Joi = require("joi");
const { USER_ROLES } = require("../constants/index");

module.exports.local_signup_post = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  cognito_id: Joi.string().required(),
  role: Joi.string()
    .valid(USER_ROLES.PRIMARY_USER, USER_ROLES.FAMILY_MEMBER, USER_ROLES.CAREGIVER, USER_ROLES.ADMIN)
    .default(USER_ROLES.PRIMARY_USER),
});

module.exports.subuser_post = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  relation: Joi.string().required(),
  phone: Joi.string().optional(),
  role: Joi.string().valid(USER_ROLES.FAMILY_MEMBER, USER_ROLES.CAREGIVER).required(),
});

module.exports.subuser_put = Joi.object({
  first_name: Joi.string().optional(),
  last_name: Joi.string().optional(),
  relation: Joi.string().optional(),
  phone: Joi.string().optional(),
  role: Joi.string().valid(USER_ROLES.FAMILY_MEMBER, USER_ROLES.CAREGIVER).required(),
});
