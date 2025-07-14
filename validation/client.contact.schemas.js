const Joi = require("joi");
const { CONTACT_TYPES } = require("../constants/index");

module.exports.contact_post = Joi.object({
  contact_type: Joi.string().valid(CONTACT_TYPES.PRIMARY, CONTACT_TYPES.SECONDARY, CONTACT_TYPES.EMERGENCY).optional().allow(null),
  first_name: Joi.string().optional().allow(null),
  last_name: Joi.string().optional().allow(null),
  relationship: Joi.string().optional().allow(null),
  phone: Joi.string().optional().allow(null),
  email: Joi.string().email().optional().allow(null),
  address: Joi.string().optional().allow(null),
  notes: Joi.string().optional().allow(null),
});

module.exports.contact_put = Joi.object({
  contact_type: Joi.string().valid(CONTACT_TYPES.PRIMARY, CONTACT_TYPES.SECONDARY, CONTACT_TYPES.EMERGENCY).optional().allow(null),
  first_name: Joi.string().optional().allow(null),
  last_name: Joi.string().optional().allow(null),
  relationship: Joi.string().optional().allow(null),
  phone: Joi.string().optional().allow(null),
  email: Joi.string().email().optional().allow(null),
  address: Joi.string().optional().allow(null),
  notes: Joi.string().optional().allow(null),
});
