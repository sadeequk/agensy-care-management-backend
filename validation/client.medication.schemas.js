const Joi = require("joi");

exports.medication_post = Joi.object({
  medication_name: Joi.string().required().max(255),
  dosage: Joi.string().required().max(100).min(3).required(),
  frequency: Joi.string().required().max(100).min(3).required(),
  purpose: Joi.string().max(255).required(),
  prescribing_doctor: Joi.string().max(255).required(),
  start_date: Joi.date().iso().required(),
  end_date: Joi.date().iso().required(),
  refill_due: Joi.date().iso().required(),
  notes: Joi.string().allow(""),
  active: Joi.boolean().default(true),
});

exports.medication_put = Joi.object({
  medication_name: Joi.string().required().max(255),
  dosage: Joi.string().required().max(100).min(3).required(),
  frequency: Joi.string().required().max(100).min(3).required(),
  purpose: Joi.string().max(255).required(),
  prescribing_doctor: Joi.string().max(255).required(),
  start_date: Joi.date().iso().required(),
  end_date: Joi.date().iso().required(),
  refill_due: Joi.date().iso().required(),
  notes: Joi.string().allow(""),
  active: Joi.boolean().default(true),
});

exports.medication_toggle_active = Joi.object({
  active: Joi.boolean().required(),
});
