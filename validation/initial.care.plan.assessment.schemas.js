const Joi = require("joi");

exports.initial_care_plan_assessment_post = Joi.object({
  initial_care_plan_assessment: Joi.object({
    id: Joi.string().uuid().optional(),
    date_of_assessment: Joi.date().iso().optional().allow(null),
    date_of_care_plan: Joi.date().iso().optional().allow(null),
    person_completing_assessment: Joi.string().optional().max(1000).allow(null),
    present_for_assessment: Joi.string().optional().max(2000).allow(null),
    goals_for_assessment: Joi.string().optional().max(2000).allow(null),
    functional_adls: Joi.string().optional().max(1000).allow(null),
    functional_iadls: Joi.string().optional().max(1000).allow(null),
    home_safety: Joi.string().optional().max(1000).allow(null),
    memory_and_recommendations: Joi.string().optional().max(1000).allow(null),
    geriatric_depression: Joi.string().optional().max(1000).allow(null),
    nutritional_health: Joi.string().optional().max(1000).allow(null),
    legal_and_financial: Joi.string().optional().max(1000).allow(null),
    care_giver_support: Joi.string().optional().max(1000).allow(null),
    next_step_care_recipient: Joi.string().optional().max(1000).allow(null),
    next_step_care_partner: Joi.string().optional().max(1000).allow(null),
  }),

  focused_recommendations: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      option_number: Joi.number().integer().min(1).required(),
      name: Joi.string().optional().max(255).allow(null),
      description: Joi.string().optional().max(500).allow(null),
      details: Joi.string().optional().max(3000).allow(null),
    })
  ).optional().allow(null),
});
