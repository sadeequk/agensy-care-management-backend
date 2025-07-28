const Joi = require("joi");
const { CARE_PLAN_CATEGORIES } = require("../constants");

exports.comprehensive_care_plan_assessment_post = Joi.object({
  client_info: Joi.object({
    first_name: Joi.string().optional().allow(null),
    last_name: Joi.string().optional().allow(null),
    date_of_birth: Joi.date().iso().optional().allow(null),
    preferred_hospital: Joi.string().optional().allow(null),
    pharmacy_name: Joi.string().optional().allow(null),
  }),

  initial_assessment: Joi.object({
    id: Joi.string().uuid().optional(),
    date_of_assessment: Joi.date().iso().optional().allow(null),
    date_of_care_plan: Joi.date().iso().optional().allow(null),
    person_completing_assessment: Joi.string().optional().allow(null),
    present_for_assessment: Joi.string().optional().allow(null),
    goals_for_assessment: Joi.string().optional().allow(null),
    next_step_care_recipient: Joi.string().optional().allow(null),
    next_step_care_partner: Joi.string().optional().allow(null),
  }),

  comprehensive_care_plan_assessment: Joi.object({
    id: Joi.string().uuid().optional(),
    initial_request: Joi.string().optional().allow(null),
    care_recipient_goals: Joi.string().optional().allow(null),
    demographic_and_historic_information: Joi.string().optional().allow(null),
    medical_history: Joi.string().optional().allow(null),
  }),

  focused_recommendations: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      option_number: Joi.number().integer().min(1).required(),
      name: Joi.string().optional().allow(null),
      description: Joi.string().optional().allow(null),
      details: Joi.string().optional().allow(null),
    })
  ),

  functional_adls: Joi.object({
    category_name: Joi.string().valid(CARE_PLAN_CATEGORIES.FUNCTIONAL_ADLS).optional(),
    summary: Joi.string().optional().allow(null),
    deficits_noted: Joi.boolean().optional(),
    detailed_table: Joi.object().unknown().optional().allow(null),
    additional_data: Joi.object().unknown().optional().allow(null),
  }),

  functional_iadls: Joi.object({
    category_name: Joi.string().valid(CARE_PLAN_CATEGORIES.FUNCTIONAL_IADLS).optional(),
    summary: Joi.string().optional().allow(null),
    deficits_noted: Joi.boolean().optional(),
    detailed_table: Joi.object().unknown().optional().allow(null),
    additional_data: Joi.object().unknown().optional().allow(null),
  }),

  home_safety: Joi.object({
    category_name: Joi.string().valid(CARE_PLAN_CATEGORIES.HOME_SAFETY).optional(),
    summary: Joi.string().optional().allow(null),
    deficits_noted: Joi.boolean().optional(),
    detailed_table: Joi.object().unknown().optional().allow(null),
    additional_data: Joi.object().unknown().optional().allow(null),
  }),

  memory_and_reasoning: Joi.object({
    category_name: Joi.string().valid(CARE_PLAN_CATEGORIES.MEMORY_REASONING).optional(),
    summary: Joi.string().optional().allow(null),
    deficits_noted: Joi.boolean().optional(),
    detailed_table: Joi.object().unknown().optional().allow(null),
    additional_data: Joi.object().unknown().optional().allow(null),
  }),

  geriatric_depression: Joi.object({
    category_name: Joi.string().valid(CARE_PLAN_CATEGORIES.GERIATRIC_DEPRESSION).optional(),
    summary: Joi.string().optional().allow(null),
    deficits_noted: Joi.boolean().optional(),
    detailed_table: Joi.object().unknown().optional().allow(null),
    additional_data: Joi.object().unknown().optional().allow(null),
  }),

  nutritional_health: Joi.object({
    category_name: Joi.string().valid(CARE_PLAN_CATEGORIES.NUTRITIONAL_HEALTH).optional(),
    summary: Joi.string().optional().allow(null),
    deficits_noted: Joi.boolean().optional(),
    detailed_table: Joi.object().unknown().optional().allow(null),
    additional_data: Joi.object().unknown().optional().allow(null),
  }),

  legal_and_financial: Joi.object({
    category_name: Joi.string().valid(CARE_PLAN_CATEGORIES.LEGAL_FINANCIAL).optional(),
    summary: Joi.string().optional().allow(null),
    deficits_noted: Joi.boolean().optional(),
    detailed_table: Joi.object().unknown().optional().allow(null),
    additional_data: Joi.object().unknown().optional().allow(null),
  }),

  care_giver_support: Joi.object({
    category_name: Joi.string().valid(CARE_PLAN_CATEGORIES.CARE_GIVER_SUPPORT).optional(),
    summary: Joi.string().optional().allow(null),
    deficits_noted: Joi.boolean().optional(),
    detailed_table: Joi.object().unknown().optional().allow(null),
    additional_data: Joi.object().unknown().optional().allow(null),
  }),

  medications: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      medication_name: Joi.string().optional().allow(null),
      dosage: Joi.string().optional().allow(null),
      frequency: Joi.string().optional().allow(null),
      start_date: Joi.date().iso().optional().allow(null),
      end_date: Joi.date().iso().optional().allow(null),
      indication: Joi.string().optional().allow(null),
    })
  ),

  medical_info: Joi.object({
    allergies: Joi.string().optional().allow(null),
    surgical_history: Joi.string().optional().allow(null),
  }),

  healthcare_providers: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().uuid().optional(),
        provider_name: Joi.string().optional().allow(null),
        provider_type: Joi.string().optional().allow(null),
        specialty: Joi.string().optional().allow(null),
        address: Joi.string().optional().allow(null),
        phone: Joi.string().optional().allow(null),
      })
    )
    .optional(),
});
