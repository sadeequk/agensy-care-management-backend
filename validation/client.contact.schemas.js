const Joi = require("joi");
const { CONTACT_TYPES } = require("../constants/index");

module.exports.contact_post = Joi.object({
  contact_type: Joi.string().valid(CONTACT_TYPES.PRIMARY, CONTACT_TYPES.SECONDARY, CONTACT_TYPES.EMERGENCY).optional(),
  first_name: Joi.string().optional(),
  last_name: Joi.string().optional(),
  relationship: Joi.string().optional(),
  phone: Joi.string().optional(),
  email: Joi.string().email().optional(),
  address: Joi.string().optional(),
  notes: Joi.string().optional(),
});

module.exports.contact_put = Joi.object({
  contact_type: Joi.string().valid(CONTACT_TYPES.PRIMARY, CONTACT_TYPES.SECONDARY, CONTACT_TYPES.EMERGENCY).optional(),
  first_name: Joi.string().optional(),
  last_name: Joi.string().optional(),
  relationship: Joi.string().optional(),
  phone: Joi.string().optional(),
  email: Joi.string().email().optional(),
  address: Joi.string().optional(),
  notes: Joi.string().optional(),
});
