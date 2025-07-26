const Joi = require("joi");
const { CARE_PLAN_CATEGORIES } = require("../constants");

exports.initial_care_plan_assessment_post = Joi.object({
  client_info: Joi.object({
    first_name: Joi.string().optional().allow(null),
    last_name: Joi.string().optional().allow(null),
    date_of_birth: Joi.date().iso().optional().allow(null),
  }),
  initial_care_plan_assessment: Joi.object({
    id: Joi.string().uuid().optional(),
    date_of_assessment: Joi.date().iso().optional().allow(null),
    date_of_care_plan: Joi.date().iso().optional().allow(null),
    person_completing_assessment: Joi.string().optional().allow(null),
    present_for_assessment: Joi.string().optional().allow(null),
    goals_for_assessment: Joi.string().optional().allow(null),
    next_step_care_recipient: Joi.string().optional().allow(null),
    next_step_care_partner: Joi.string().optional().allow(null),
  }),
  focused_recommendations: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      option_number: Joi.number().integer().required(),
      name: Joi.string().optional().allow(null),
      description: Joi.string().optional().allow(null),
      details: Joi.string().optional().allow(null),
    })
  ),
  functional_adls: Joi.object({
    id: Joi.string().uuid().optional(),
    category_name: Joi.string()
      .valid(...Object.values(CARE_PLAN_CATEGORIES.FUNCTIONAL_ADLS))
      .optional()
      .allow(null),
    summary: Joi.string().optional().allow(null),
  }),
  functional_iadls: Joi.object({
    id: Joi.string().uuid().optional(),
    category_name: Joi.string()
      .valid(...Object.values(CARE_PLAN_CATEGORIES.FUNCTIONAL_IADLS))
      .optional()
      .allow(null),
    summary: Joi.string().optional().allow(null),
  }),
  home_safety: Joi.object({
    id: Joi.string().uuid().optional(),
    category_name: Joi.string()
      .valid(...Object.values(CARE_PLAN_CATEGORIES.HOME_SAFETY))
      .optional()
      .allow(null),
    summary: Joi.string().optional().allow(null),
  }),
  memory_and_recommendations: Joi.object({
    id: Joi.string().uuid().optional(),
    category_name: Joi.string()
      .valid(...Object.values(CARE_PLAN_CATEGORIES.MEMORY_REASONING))
      .optional()
      .allow(null),
    summary: Joi.string().optional().allow(null),
  }),
  geriatric_depression: Joi.object({
    id: Joi.string().uuid().optional(),
    category_name: Joi.string()
      .valid(...Object.values(CARE_PLAN_CATEGORIES.GERIATRIC_DEPRESSION))
      .optional()
      .allow(null),
    summary: Joi.string().optional().allow(null),
  }),
  nutritional_health: Joi.object({
    id: Joi.string().uuid().optional(),
    category_name: Joi.string()
      .valid(...Object.values(CARE_PLAN_CATEGORIES.NUTRITIONAL_HEALTH))
      .optional()
      .allow(null),
    summary: Joi.string().optional().allow(null),
  }),
  legal_and_financial: Joi.object({
    id: Joi.string().uuid().optional(),
    category_name: Joi.string()
      .valid(...Object.values(CARE_PLAN_CATEGORIES.LEGAL_FINANCIAL))
      .optional()
      .allow(null),
    summary: Joi.string().optional().allow(null),
  }),
  care_giver_support: Joi.object({
    id: Joi.string().uuid().optional(),
    category_name: Joi.string()
      .valid(...Object.values(CARE_PLAN_CATEGORIES.CARE_GIVER_SUPPORT))
      .optional()
      .allow(null),
    summary: Joi.string().optional().allow(null),
  }),
});
