const Joi = require("joi");

module.exports.medical_post = Joi.object({
  diagnoses: Joi.string().optional().allow(null),
  allergies: Joi.string().optional().allow(null),
  dietary_restrictions: Joi.string().optional().allow(null),
  surgical_history: Joi.string().optional().allow(null),
  cognitive_status: Joi.string().optional().allow(null),
  last_cognitive_screening: Joi.date().iso().optional().allow(null),
  test_type: Joi.string().optional().allow(null),
  cognitive_score: Joi.string().max(50).optional().allow(null),
  notes: Joi.string().optional().allow(null),
});

module.exports.medical_put = Joi.object({
  diagnoses: Joi.string().optional().allow(null),
  allergies: Joi.string().optional().allow(null),
  dietary_restrictions: Joi.string().optional().allow(null),
  surgical_history: Joi.string().optional().allow(null),
  cognitive_status: Joi.string().optional().allow(null),
  last_cognitive_screening: Joi.date().iso().optional().allow(null),
  test_type: Joi.string().optional().allow(null),
  cognitive_score: Joi.string().max(50).optional().allow(null),
  notes: Joi.string().optional().allow(null),
});
