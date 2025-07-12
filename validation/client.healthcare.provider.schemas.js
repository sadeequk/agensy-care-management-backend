const Joi = require("joi");

exports.provider_post = Joi.object({
  provider_type: Joi.string().optional().max(100),
  provider_name: Joi.string().optional().max(255),
  specialty: Joi.string().max(255).optional(),
  address: Joi.string().max(255).optional(),
  phone: Joi.string().max(20).optional(),
  fax: Joi.string().max(20).optional(),
  last_visit: Joi.date().iso().optional(),
  next_visit: Joi.date().iso().optional(),
  notes: Joi.string().optional(),
  specialty_provider: Joi.boolean().default(false),
  follow_up: Joi.string().max(255).optional(),
  active: Joi.boolean().default(true),
});

exports.provider_put = Joi.object({
  provider_type: Joi.string().optional().max(100),
  provider_name: Joi.string().optional().max(255),
  specialty: Joi.string().max(255).optional(),
  address: Joi.string().max(255).optional(),
  phone: Joi.string().max(20).optional(),
  fax: Joi.string().max(20).optional(),
  last_visit: Joi.date().iso().optional(),
  next_visit: Joi.date().iso().optional(),
  notes: Joi.string().optional(),
  specialty_provider: Joi.boolean().optional().default(false),
  follow_up: Joi.string().max(255).optional(),
  active: Joi.boolean().default(true),
});

exports.provider_toggle_active = Joi.object({
  active: Joi.boolean().required(),
});
