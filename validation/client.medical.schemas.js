const Joi = require("joi");
const { CONGITO_STATUS } = require("../constants");
module.exports.medical_post = Joi.object({
  diagnoses: Joi.string().optional(),
  allergies: Joi.string().optional(),
  dietary_restrictions: Joi.string().optional(),
  surgical_history: Joi.string().optional(),
  cognitive_status: Joi.string().optional().valid(...Object.values(CONGITO_STATUS)),
  last_cognitive_screening: Joi.date().iso().optional(),
  cognitive_score: Joi.string().max(50).optional(),
  notes: Joi.string().optional(),
});

module.exports.medical_put = Joi.object({
  diagnoses: Joi.string().optional(),
  allergies: Joi.string().optional(),
  dietary_restrictions: Joi.string().optional(),
  surgical_history: Joi.string().optional(),
  cognitive_status: Joi.string().optional().valid(...Object.values(CONGITO_STATUS)),
  last_cognitive_screening: Joi.date().iso().optional(),
  cognitive_score: Joi.string().max(50).optional(),
  notes: Joi.string().optional(),
});
