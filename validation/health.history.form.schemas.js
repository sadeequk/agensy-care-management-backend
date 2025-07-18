const Joi = require("joi");

exports.health_history_post = Joi.object({
  id: Joi.string().uuid().optional(),
  date: Joi.date().iso().optional().allow(null),
  diagnosis: Joi.string().max(1000).optional().allow(null),
  health_concern_description: Joi.string().max(1000).optional().allow(null),
  onset_of_symptoms: Joi.string().max(255).optional().allow(null),
  frequency_of_symptoms: Joi.string().max(255).optional().allow(null),
  severity_of_symptoms: Joi.string().max(255).optional().allow(null),
  hospitalization: Joi.string().max(1000).optional().allow(null),
  specialty_provider: Joi.string().max(255).optional().allow(null),
  medication_started: Joi.string().max(255).optional().allow(null),
  medication_stopped: Joi.string().max(255).optional().allow(null),
  home_health: Joi.string().max(255).optional().allow(null),
  what_worked: Joi.string().max(1000).optional().allow(null),
  notes: Joi.string().max(2000).optional().allow(null),
}); 