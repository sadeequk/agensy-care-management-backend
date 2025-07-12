const Joi = require("joi");

exports.medication_post = Joi.object({
  medication_name: Joi.string().optional().max(255),
  dosage: Joi.string().min(3).max(100).optional(),
  frequency: Joi.string().min(3).max(100).optional(),
  purpose: Joi.string().max(255).optional(),
  prescribing_doctor: Joi.string().max(255).optional(),
  start_date: Joi.date().iso().optional(),
  end_date: Joi.date().iso().optional(),
  refill_due: Joi.date().iso().optional(),
  notes: Joi.string().optional(),
  active: Joi.boolean().default(true),
});

exports.medication_put = Joi.object({
  medication_name: Joi.string().optional().max(255),
  dosage: Joi.string().min(3).max(100).optional(),
  frequency: Joi.string().min(3).max(100).optional(),  
  purpose: Joi.string().max(255).optional(),
  prescribing_doctor: Joi.string().max(255).optional(),
  start_date: Joi.date().iso().optional(),
  end_date: Joi.date().iso().optional(),
  refill_due: Joi.date().iso().optional(),
  notes: Joi.string().optional(),
  active: Joi.boolean().default(true),
});

exports.medication_toggle_active = Joi.object({
  active: Joi.boolean().required(),
});
