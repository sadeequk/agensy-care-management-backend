const Joi = require("joi");

exports.provider_post = Joi.object({
  provider_type: Joi.string().required().max(100),
  provider_name: Joi.string().required().max(255),
  specialty: Joi.string().max(255).required(),
  address: Joi.string().max(255).required(),
  phone: Joi.string().max(20).required(),
  fax: Joi.string().max(20),
  last_visit: Joi.date().iso().required(),
  next_visit: Joi.date().iso().required(),
  notes: Joi.string(),
  active: Joi.boolean().default(true),
});

exports.provider_put = Joi.object({
  provider_type: Joi.string().required().max(100),
  provider_name: Joi.string().required().max(255),
  specialty: Joi.string().max(255).required(),
  address: Joi.string().max(255).required(),
  phone: Joi.string().max(20).required(),
  fax: Joi.string().max(20),
  last_visit: Joi.date().iso().required(),
  next_visit: Joi.date().iso().required(),
  notes: Joi.string(),
  active: Joi.boolean().default(true),
});

exports.provider_toggle_active = Joi.object({
  active: Joi.boolean().required(),
});
