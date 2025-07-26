const Joi = require("joi");

exports.provider_post = Joi.object({
  provider_type: Joi.string().optional().allow(null),
  provider_name: Joi.string().optional().allow(null),
  specialty: Joi.string().optional().allow(null),
  address: Joi.string().optional().allow(null),
  phone: Joi.string().optional().allow(null),
  fax: Joi.string().optional().allow(null),
  last_visit: Joi.date().iso().optional().allow(null),
  next_visit: Joi.date().iso().optional().allow(null),
  notes: Joi.string().optional().allow(null),
  specialty_provider: Joi.boolean().default(false),
  follow_up: Joi.string().optional().allow(null),
  active: Joi.boolean().default(true),
});

exports.provider_put = Joi.object({
  provider_type: Joi.string().optional().allow(null),
  provider_name: Joi.string().optional().allow(null),
  specialty: Joi.string().optional().allow(null),
  address: Joi.string().optional().allow(null),
  phone: Joi.string().optional().allow(null),
  fax: Joi.string().optional().allow(null),
  last_visit: Joi.date().iso().optional().allow(null),
  next_visit: Joi.date().iso().optional().allow(null),
  notes: Joi.string().optional().allow(null),
  specialty_provider: Joi.boolean().optional().default(false),
  follow_up: Joi.string().optional().allow(null),
  active: Joi.boolean().default(true),
});

exports.provider_toggle_active = Joi.object({
  active: Joi.boolean().required(),
});
