const Joi = require("joi");

exports.medication_post = Joi.object({
  medication_name: Joi.string().optional().allow(null),
  dosage: Joi.string().optional().allow(null),
  frequency: Joi.string().optional().allow(null),
  purpose: Joi.string().optional().allow(null),
  prescribing_doctor: Joi.string().optional().allow(null),
  start_date: Joi.date().iso().optional().allow(null),
  end_date: Joi.date().iso().optional().allow(null),
  refill_due: Joi.date().iso().optional().allow(null),
  notes: Joi.string().optional().allow(null),
  active: Joi.boolean().default(true),
});

exports.medication_put = Joi.object({
  medication_name: Joi.string().optional().allow(null),
  dosage: Joi.string().optional().allow(null),
  frequency: Joi.string().optional().allow(null),
  purpose: Joi.string().optional().allow(null),
  prescribing_doctor: Joi.string().optional().allow(null),
  start_date: Joi.date().iso().optional().allow(null),
  end_date: Joi.date().iso().optional().allow(null),
  refill_due: Joi.date().iso().optional().allow(null),
  notes: Joi.string().optional().allow(null),
  active: Joi.boolean().default(true),
});

exports.medication_toggle_active = Joi.object({
  active: Joi.boolean().required(),
});
