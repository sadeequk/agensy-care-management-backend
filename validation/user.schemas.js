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
  role: Joi.string()
    .valid(USER_ROLES.PRIMARY_USER, USER_ROLES.FAMILY_MEMBER, USER_ROLES.CAREGIVER, USER_ROLES.ADMIN)
    .default(USER_ROLES.FAMILY_MEMBER),
});
