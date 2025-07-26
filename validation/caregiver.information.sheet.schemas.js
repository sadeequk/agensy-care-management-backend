const Joi = require("joi");

exports.caregiver_information_sheet_post = Joi.object({
  name: Joi.string().optional().allow(null),
  nickname_preferred_name: Joi.string().optional().allow(null),
  wake_time: Joi.string()
    .pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .optional()
    .allow(null),
  sleep_time: Joi.string()
    .pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .optional()
    .allow(null),
  breakfast_time: Joi.string()
    .pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .optional()
    .allow(null),
  lunch_time: Joi.string()
    .pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .optional()
    .allow(null),
  snacks_time: Joi.string()
    .pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .optional()
    .allow(null),
  activity_time: Joi.string()
    .pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .optional()
    .allow(null),
  nap_time: Joi.string()
    .pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .optional()
    .allow(null),
  dinner_time: Joi.string()
    .pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .optional()
    .allow(null),
  medication_time: Joi.string()
    .pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .optional()
    .allow(null),
  likes: Joi.string().optional().allow(null),
  dislikes: Joi.string().optional().allow(null),
  redirection_techniques: Joi.string().optional().allow(null),
  triggers: Joi.string().optional().allow(null),
  helpful_information: Joi.string().optional().allow(null),
  documentation: Joi.string().optional().allow(null),
});
