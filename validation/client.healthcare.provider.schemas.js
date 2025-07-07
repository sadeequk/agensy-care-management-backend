const Joi = require("joi");

exports.provider_post = Joi.object({
  provider_type: Joi.string().required().max(100),
  provider_name: Joi.string().required().max(255),
  specialty: Joi.string().max(255),
  address: Joi.string().max(255),
  phone: Joi.string().max(20),
  fax: Joi.string().max(20),
  last_visit: Joi.date().iso(),
  next_visit: Joi.date().iso(),
  notes: Joi.string().allow(""),
  specialty_provider: Joi.boolean().default(false),
  follow_up: Joi.string().max(255),
  active: Joi.boolean().default(true),
});

exports.provider_put = Joi.object({
  provider_type: Joi.string().required().max(100),
  provider_name: Joi.string().required().max(255),
  specialty: Joi.string().max(255),
  address: Joi.string().max(255),
  phone: Joi.string().max(20),
  fax: Joi.string().max(20),
  last_visit: Joi.date().iso(),
  next_visit: Joi.date().iso(),
  notes: Joi.string().allow(""),
  specialty_provider: Joi.boolean().default(false),
  follow_up: Joi.string().max(255),
  active: Joi.boolean().default(true),
});

exports.provider_toggle_active = Joi.object({
  active: Joi.boolean().required(),
});
