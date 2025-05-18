const Joi = require("joi");
const { CONTACT_TYPES } = require("../constants/index");

module.exports.contact_post = Joi.object({
  contact_type: Joi.string().valid(CONTACT_TYPES.PRIMARY, CONTACT_TYPES.SECONDARY, CONTACT_TYPES.EMERGENCY).required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  relationship: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email(),
  address: Joi.string(),
  notes: Joi.string().allow(""),
});

module.exports.contact_put = Joi.object({
  contact_type: Joi.string().valid(CONTACT_TYPES.PRIMARY, CONTACT_TYPES.SECONDARY, CONTACT_TYPES.EMERGENCY),
  first_name: Joi.string(),
  last_name: Joi.string(),
  relationship: Joi.string(),
  phone: Joi.string(),
  email: Joi.string().email(),
  address: Joi.string(),
  notes: Joi.string().allow(""),
});
