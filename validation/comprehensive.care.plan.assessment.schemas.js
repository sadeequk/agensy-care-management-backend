const Joi = require("joi");

exports.comprehensive_care_plan_assessment_post = Joi.object({
  comprehensive_care_plan_assessment: Joi.object({
    id: Joi.string().uuid().optional(),
    date_of_assessment: Joi.date().iso().optional().allow(null),
    date_of_care_plan: Joi.date().iso().optional().allow(null),
    person_completing_assessment: Joi.string().optional().max(1000).allow(null),
    present_for_assessment: Joi.string().optional().allow(null),
    goals_for_assessment: Joi.string().optional().allow(null),
    next_step_care_recipient: Joi.string().optional().max(1000).allow(null),
    next_step_care_partner: Joi.string().optional().max(1000).allow(null),
    assessment_summary: Joi.string().optional().allow(null),
    care_plan_recommendations: Joi.string().optional().allow(null),
    risk_factors: Joi.string().optional().allow(null),
    interventions_planned: Joi.string().optional().allow(null),
    expected_outcomes: Joi.string().optional().allow(null),
    review_date: Joi.date().iso().optional().allow(null),
  }).optional().allow(null),

  focused_recommendations: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      option_number: Joi.number().integer().min(1).required(),
      name: Joi.string().optional().max(255).allow(null),
      description: Joi.string().optional().max(500).allow(null),
      details: Joi.string().optional().max(3000).allow(null),
    })
  ).optional(),

  // Category fields with comprehensive data
  functional_adls: Joi.object({
    summary: Joi.string().optional().allow(null),
    deficits_noted: Joi.boolean().optional(),
    detailed_table: Joi.object().optional().allow(null),
    additional_data: Joi.object().optional().allow(null),
  }).optional(),

  functional_iadls: Joi.object({
    summary: Joi.string().optional().allow(null),
    deficits_noted: Joi.boolean().optional(),
    detailed_table: Joi.object().optional().allow(null),
    additional_data: Joi.object().optional().allow(null),
  }).optional(),

  home_safety: Joi.object({
    summary: Joi.string().optional().allow(null),
    deficits_noted: Joi.boolean().optional(),
    detailed_table: Joi.object().optional().allow(null),
    additional_data: Joi.object().optional().allow(null),
  }).optional(),

  memory_and_recommendations: Joi.object({
    summary: Joi.string().optional().allow(null),
    deficits_noted: Joi.boolean().optional(),
    detailed_table: Joi.object().optional().allow(null),
    additional_data: Joi.object().optional().allow(null),
  }).optional(),

  geriatric_depression: Joi.object({
    summary: Joi.string().optional().allow(null),
    deficits_noted: Joi.boolean().optional(),
    detailed_table: Joi.object().optional().allow(null),
    additional_data: Joi.object().optional().allow(null),
  }).optional(),

  nutritional_health: Joi.object({
    summary: Joi.string().optional().allow(null),
    deficits_noted: Joi.boolean().optional(),
    detailed_table: Joi.object().optional().allow(null),
    additional_data: Joi.object().optional().allow(null),
  }).optional(),

  legal_and_financial: Joi.object({
    summary: Joi.string().optional().allow(null),
    deficits_noted: Joi.boolean().optional(),
    detailed_table: Joi.object().optional().allow(null),
    additional_data: Joi.object().optional().allow(null),
  }).optional(),

  care_giver_support: Joi.object({
    summary: Joi.string().optional().allow(null),
    deficits_noted: Joi.boolean().optional(),
    detailed_table: Joi.object().optional().allow(null),
    additional_data: Joi.object().optional().allow(null),
  }).optional(),
}); 