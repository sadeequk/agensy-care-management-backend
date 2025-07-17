const Joi = require("joi");
const { VACCINATION_TYPES, LIVING_SITUATION } = require("../constants");

exports.facesheet_put = Joi.object({
  client_info: Joi.object({
    first_name: Joi.string().optional().min(2).max(100).allow(null),
    last_name: Joi.string().optional().min(2).max(100).allow(null),
    date_of_birth: Joi.date().iso().optional().allow(null),
    phone: Joi.string().optional().max(20).allow(null),
    address: Joi.string().optional().max(255).allow(null),
    preferred_hospital: Joi.string().max(255).optional().allow(null),
    hospital_address: Joi.string().max(255).optional().allow(null),
    hospital_phone: Joi.string().max(20).optional().allow(null),
    pharmacy_name: Joi.string().max(255).optional().allow(null),
    pharmacy_address: Joi.string().max(255).optional().allow(null),
    pharmacy_phone: Joi.string().max(20).optional().allow(null),
    pharmacy_fax: Joi.string().max(20).optional().allow(null),
    ssn: Joi.string().max(20).optional().allow(null),
    advance_directive: Joi.string().max(255).optional().allow(null),
    race: Joi.string().max(50).optional().allow(null),
    language: Joi.string().max(50).optional().allow(null),
    last_care_plan_date: Joi.date().iso().optional().allow(null),
    gender: Joi.string().max(50).optional().allow(null),
    code_status: Joi.string().max(50).optional().allow(null),
    marital_status: Joi.string().max(50).optional().allow(null),
    living_situation: Joi.string()
      .optional()
      .valid(...Object.values(LIVING_SITUATION)).allow(null),
  }),
  emergency_contact: Joi.object({
    first_name: Joi.string().optional().min(2).max(100).allow(null),
    last_name: Joi.string().optional().min(2).max(100).allow(null),
    relationship: Joi.string().max(100).optional().allow(null),
    phone: Joi.string().max(20).optional().allow(null),
    email: Joi.string().max(255).optional().allow(null),
    address: Joi.string().max(255).optional().allow(null),
  }),
  medications: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      medication_name: Joi.string().optional().min(2).max(255).allow(null),
      dosage: Joi.string().optional().max(100).allow(null),
      purpose: Joi.string().max(255).optional().allow(null),
      start_date: Joi.date().iso().optional().allow(null),
      end_date: Joi.date().iso().optional().allow(null),
    })
  ),
  healthcare_providers: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      provider_type: Joi.string().optional().max(100).allow(null),
      provider_name: Joi.string().optional().min(2).max(255).allow(null),
      specialty: Joi.string().max(255).optional().allow(null),
      phone: Joi.string().max(20).optional().allow(null),
      address: Joi.string().max(255).optional().allow(null),
      last_visit: Joi.date().iso().optional().allow(null),
      next_visit: Joi.date().iso().optional().allow(null),
    })
  ),
  medical_info: Joi.object({
    allergies: Joi.string().max(255).optional().allow(null),
    diagnoses: Joi.string().max(255).optional().allow(null),
    surgical_history: Joi.string().max(255).optional().allow(null),
    dietary_restrictions: Joi.string().max(255).optional().allow(null),
    cognitive_status: Joi.string().optional().allow(null),
    last_cognitive_screening: Joi.date().iso().optional().allow(null),
    cognitive_score: Joi.string().max(50).optional().allow(null),
    notes: Joi.string().max(255).optional().allow(null),
  }),
  vaccinations: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      name: Joi.string()
        .optional()
        .valid(...Object.values(VACCINATION_TYPES)).allow(null),
      date: Joi.date().iso().optional().allow(null),
      next_vaccine: Joi.string().max(255).optional().allow(null),
    })
  ),
  home_health_agency: Joi.object({
    id: Joi.string().uuid().optional(),
    name: Joi.string().optional().max(100).allow(null),
    phone: Joi.string().max(20).optional().allow(null),
    address: Joi.string().max(255).optional().allow(null),
    fax: Joi.string().max(20).optional().allow(null),
    schedule: Joi.string().max(255).optional().allow(null),
    prescribing_doctor: Joi.string().max(255).optional().allow(null),
    start_date: Joi.date().iso().optional().allow(null),
    discharge_date: Joi.date().iso().optional().allow(null),
  }),
  bloodwork: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      name: Joi.string().optional().max(100).allow(null),
      date: Joi.date().iso().optional().allow(null),
      results: Joi.string().max(255).optional().allow(null),
      ordered_by: Joi.string().max(255).optional().allow(null),
      repeat: Joi.string().max(255).optional().allow(null),
    })
  ),
  caregiver_agency: Joi.object({
    id: Joi.string().uuid().optional(),
    name: Joi.string().optional().max(100).allow(null),
    phone: Joi.string().max(20).optional().allow(null),
    address: Joi.string().max(255).optional().allow(null),
    point_of_contact: Joi.string().max(255).optional().allow(null),
    caregiver_schedule: Joi.string().max(255).optional().allow(null),
    caregiver_duties: Joi.string().max(255).optional().allow(null),
    important_information: Joi.string().max(255).optional().allow(null),
  }),
  medical_conditions: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      condition: Joi.string().optional().max(255).allow(null),
      onset_date: Joi.date().iso().optional().allow(null),
      notes: Joi.string().max(255).optional().allow(null),
    })
  ),
  short_form: Joi.object({
    insurance: Joi.string().max(255).optional().allow(null),
    medicare: Joi.string().max(255).optional().allow(null),
    group_number: Joi.string().max(255).optional().allow(null),
    id_number: Joi.string().max(255).optional().allow(null),
    mpoa: Joi.string().max(255).optional().allow(null),
    mpoa_phone: Joi.string().max(255).optional().allow(null),
    mpoa_address: Joi.string().max(255).optional().allow(null),
    dpoa: Joi.string().max(255).optional().allow(null),
    dpoa_phone: Joi.string().max(255).optional().allow(null),
    dpoa_address: Joi.string().max(255).optional().allow(null),
  }),
});
