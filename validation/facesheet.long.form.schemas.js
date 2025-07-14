const Joi = require("joi");
const { VACCINATION_TYPES, LIVING_SITUATION, CONGITO_STATUS } = require("../constants");

exports.facesheet_put = Joi.object({
  client_info: Joi.object({
    first_name: Joi.string().optional().min(2).max(100),
    last_name: Joi.string().optional().min(2).max(100),
    date_of_birth: Joi.date().iso().optional(),
    phone: Joi.string().optional().max(20),
    address: Joi.string().optional().max(255),
    preferred_hospital: Joi.string().max(255).optional(),
    hospital_address: Joi.string().max(255).optional(),
    hospital_phone: Joi.string().max(20).optional(),
    pharmacy_name: Joi.string().max(255).optional(),
    pharmacy_address: Joi.string().max(255).optional(),
    pharmacy_phone: Joi.string().max(20).optional(),
    pharmacy_fax: Joi.string().max(20).optional(),
    code_status: Joi.string().max(50).optional(),
    ssn: Joi.string().max(20).optional(),
    advance_directive: Joi.string().max(255).optional(),
    race: Joi.string().max(50).optional(),
    language: Joi.string().max(50).optional(),
    last_care_plan_date: Joi.date().iso().optional(),
    gender: Joi.string().max(50).optional(),
    marital_status: Joi.string().max(50).optional(),
    living_situation: Joi.string()
      .optional()
      .valid(...Object.values(LIVING_SITUATION)).allow(null),
  }),
  emergency_contact: Joi.object({
    first_name: Joi.string().optional().min(2).max(100),
    last_name: Joi.string().optional().min(2).max(100),
    relationship: Joi.string().max(100).optional(),
    phone: Joi.string().max(20).optional(),
    email: Joi.string().max(255).optional(),
    address: Joi.string().max(255).optional(),
  }),
  medications: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      medication_name: Joi.string().optional().min(2).max(255),
      dosage: Joi.string().optional().max(100),
      purpose: Joi.string().max(255).optional(),
    })
  ),
  healthcare_providers: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      provider_type: Joi.string().optional().max(100),
      provider_name: Joi.string().optional().min(2).max(255),
      specialty: Joi.string().max(255).optional(),
      phone: Joi.string().max(20).optional(),
      address: Joi.string().max(255).optional(),
      last_visit: Joi.date().iso().optional(),
      next_visit: Joi.date().iso().optional(),
    })
  ),
  medical_info: Joi.object({
    allergies: Joi.string().max(255).optional(),
    diagnoses: Joi.string().max(255).optional(),
    surgical_history: Joi.string().max(255).optional(),
    dietary_restrictions: Joi.string().max(255).optional(),
    cognitive_status: Joi.string().optional().valid(...Object.values(CONGITO_STATUS)),
    last_cognitive_screening: Joi.date().iso().optional(),
    cognitive_score: Joi.string().max(50).optional(),
    notes: Joi.string().max(255).optional(),
  }),
  vaccinations: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      name: Joi.string()
        .optional()
        .valid(...Object.values(VACCINATION_TYPES)),
      date: Joi.date().iso().optional(),
      next_vaccine: Joi.string().max(255).optional(),
    })
  ),
  home_health_agency: Joi.object({
    id: Joi.string().uuid().optional(),
    name: Joi.string().optional().max(100),
    phone: Joi.string().max(20).optional(),
    address: Joi.string().max(255).optional(),
    fax: Joi.string().max(20).optional(),
    schedule: Joi.string().max(255).optional(),
    prescribing_doctor: Joi.string().max(255).optional(),
    start_date: Joi.date().iso().optional(),
    discharge_date: Joi.date().iso().optional(),
  }),
  bloodwork: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      name: Joi.string().optional().max(100),
      date: Joi.date().iso().optional(),
      results: Joi.string().max(255).optional(),
      ordered_by: Joi.string().max(255).optional(),
      repeat: Joi.string().max(255).optional(),
    })
  ),
  caregiver_agency: Joi.object({
    id: Joi.string().uuid().optional(),
    name: Joi.string().optional().max(100),
    phone: Joi.string().max(20).optional(),
    address: Joi.string().max(255).optional(),
    point_of_contact: Joi.string().max(255).optional(),
    caregiver_schedule: Joi.string().max(255).optional(),
    caregiver_duties: Joi.string().max(255).optional(),
    important_information: Joi.string().max(255).optional(),
  }),
  medical_conditions: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      condition: Joi.string().optional().max(255),
      onset_date: Joi.date().iso().optional(),
      notes: Joi.string().max(255).optional(),
    })
  ),
  short_form: Joi.object({
    insurance: Joi.string().max(255).optional(),
    medicare: Joi.string().max(255).optional(),
    group_number: Joi.string().max(255).optional(),
    id_number: Joi.string().max(255).optional(),
    mpoa: Joi.string().max(255).optional(),
    mpoa_phone: Joi.string().max(255).optional(),
    mpoa_address: Joi.string().max(255).optional(),
    dpoa: Joi.string().max(255).optional(),
    dpoa_phone: Joi.string().max(255).optional(),
    dpoa_address: Joi.string().max(255).optional(),
  }),
});
