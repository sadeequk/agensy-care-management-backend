const Joi = require("joi");
const { USER_ROLES, SUBSCRIPTION_TYPE } = require("../constants/index");

module.exports.local_signup_post = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  cognito_id: Joi.string().required(),
  role: Joi.string()
    .valid(USER_ROLES.PRIMARY_USER, USER_ROLES.FAMILY_MEMBER, USER_ROLES.CAREGIVER, USER_ROLES.ADMIN)
    .default(USER_ROLES.PRIMARY_USER),
  subscription_type: Joi.string()
    .valid(...Object.values(SUBSCRIPTION_TYPE))
    .default(SUBSCRIPTION_TYPE.FREE),
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
