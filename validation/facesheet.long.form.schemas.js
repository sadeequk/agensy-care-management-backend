const Joi = require("joi");
const { VACCINATION_TYPES, LIVING_SITUATION } = require("../constants");

exports.facesheet_put = Joi.object({
  client_info: Joi.object({
    first_name: Joi.string().optional().allow(null),
    last_name: Joi.string().optional().allow(null),
    date_of_birth: Joi.date().iso().optional().allow(null),
    phone: Joi.string().optional().allow(null),
    address: Joi.string().optional().allow(null),
    preferred_hospital: Joi.string().optional().allow(null),
    hospital_address: Joi.string().optional().allow(null),
    hospital_phone: Joi.string().optional().allow(null),
    pharmacy_name: Joi.string().optional().allow(null),
    pharmacy_address: Joi.string().optional().allow(null),
    pharmacy_phone: Joi.string().optional().allow(null),
    pharmacy_fax: Joi.string().optional().allow(null),
    ssn: Joi.string().optional().allow(null),
    advance_directive: Joi.string().optional().allow(null),
    race: Joi.string().optional().allow(null),
    language: Joi.string().optional().allow(null),
    last_care_plan_date: Joi.date().iso().optional().allow(null),
    gender: Joi.string().optional().allow(null),
    code_status: Joi.string().optional().allow(null),
    marital_status: Joi.string().optional().allow(null),
    living_situation: Joi.string()
      .optional()
      .valid(...Object.values(LIVING_SITUATION))
      .allow(null),
  }),
  emergency_contact: Joi.object({
    first_name: Joi.string().optional().allow(null),
    last_name: Joi.string().optional().allow(null),
    relationship: Joi.string().optional().allow(null),
    phone: Joi.string().optional().allow(null),
    email: Joi.string().optional().allow(null),
    address: Joi.string().optional().allow(null),
  }).optional(),
  medications: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      medication_name: Joi.string().optional().allow(null),
      dosage: Joi.string().optional().allow(null),
      frequency: Joi.string().optional().allow(null),
      purpose: Joi.string().optional().allow(null),
      start_date: Joi.date().iso().optional().allow(null),
      end_date: Joi.date().iso().optional().allow(null),
    })
  ),
  healthcare_providers: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      provider_type: Joi.string().optional().allow(null),
      provider_name: Joi.string().optional().allow(null),
      specialty: Joi.string().optional().allow(null),
      phone: Joi.string().optional().allow(null),
      address: Joi.string().optional().allow(null),
      last_visit: Joi.date().iso().optional().allow(null),
      next_visit: Joi.date().iso().optional().allow(null),
    })
  ),
  medical_info: Joi.object({
    allergies: Joi.string().optional().allow(null),
    diagnoses: Joi.string().optional().allow(null),
    surgical_history: Joi.string().optional().allow(null),
    dietary_restrictions: Joi.string().optional().allow(null),
    cognitive_status: Joi.string().optional().allow(null),
    test_type: Joi.string().optional().allow(null),
    last_cognitive_screening: Joi.date().iso().optional().allow(null),
    cognitive_score: Joi.string().optional().allow(null),
    notes: Joi.string().optional().allow(null),
  }),
  vaccinations: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      name: Joi.string()
        .optional()
        .valid(...Object.values(VACCINATION_TYPES))
        .allow(null),
      date: Joi.date().iso().optional().allow(null),
      next_vaccine: Joi.string().optional().allow(null),
    })
  ),
  home_health_agency: Joi.object({
    id: Joi.string().uuid().optional(),
    name: Joi.string().optional().allow(null),
    phone: Joi.string().optional().allow(null),
    address: Joi.string().optional().allow(null),
    fax: Joi.string().optional().allow(null),
    schedule: Joi.string().optional().allow(null),
    prescribing_doctor: Joi.string().optional().allow(null),
    start_date: Joi.date().iso().optional().allow(null),
    discharge_date: Joi.date().iso().optional().allow(null),
  }),
  bloodwork: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      name: Joi.string().optional().allow(null),
      date: Joi.date().iso().optional().allow(null),
      results: Joi.string().optional().allow(null),
      ordered_by: Joi.string().optional().allow(null),
      repeat: Joi.string().optional().allow(null),
    })
  ),
  caregiver_agency: Joi.object({
    id: Joi.string().uuid().optional(),
    name: Joi.string().optional().allow(null),
    phone: Joi.string().optional().allow(null),
    address: Joi.string().optional().allow(null),
    point_of_contact: Joi.string().optional().allow(null),
    caregiver_schedule: Joi.string().optional().allow(null),
    caregiver_duties: Joi.string().optional().allow(null),
    important_information: Joi.string().optional().allow(null),
  }),
  medical_conditions: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      condition: Joi.string().optional().allow(null),
      onset_date: Joi.date().iso().optional().allow(null),
      notes: Joi.string().optional().allow(null),
    })
  ),
  short_form: Joi.object({
    insurance: Joi.string().optional().allow(null),
    medicare: Joi.string().optional().allow(null),
    group_number: Joi.string().optional().allow(null),
    id_number: Joi.string().optional().allow(null),
    mpoa: Joi.string().optional().allow(null),
    mpoa_phone: Joi.string().optional().allow(null),
    mpoa_address: Joi.string().optional().allow(null),
    dpoa: Joi.string().optional().allow(null),
    dpoa_phone: Joi.string().optional().allow(null),
    dpoa_address: Joi.string().optional().allow(null),
  }),
});
