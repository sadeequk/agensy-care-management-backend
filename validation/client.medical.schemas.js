const Joi = require("joi");

module.exports.medical_post = Joi.object({
  diagnoses: Joi.string().allow("").required(),
  allergies: Joi.string().allow("").required(),
  dietary_restrictions: Joi.string().allow("").required(),
  surgical_history: Joi.string().allow("").required(),
  cognitive_status: Joi.string().allow("").required(),
  last_cognitive_screening: Joi.date().iso().required(),
  cognitive_score: Joi.string().max(50).allow("").required(),
  notes: Joi.string().allow(""),
});

module.exports.medical_put = Joi.object({
  diagnoses: Joi.string().allow("").required(),
  allergies: Joi.string().allow("").required(),
  dietary_restrictions: Joi.string().allow("").required(),
  surgical_history: Joi.string().allow("").required(),
  cognitive_status: Joi.string().allow("").required(),
  last_cognitive_screening: Joi.date().iso().required(),
  cognitive_score: Joi.string().max(50).allow("").required(),
  notes: Joi.string().allow(""),
});
