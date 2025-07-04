const Joi = require("joi");
const { VACCINATION_TYPES, LIVING_SITUATION } = require("../constants");

exports.facesheet_put = Joi.object({
  client_info: Joi.object({
    first_name: Joi.string().required().min(2).max(100),
    last_name: Joi.string().required().min(2).max(100),
    date_of_birth: Joi.date().iso().required(),
    phone: Joi.string().required().max(20),
    address: Joi.string().required().max(255),
    preferred_hospital: Joi.string().max(255),
    hospital_address: Joi.string().max(255),
    hospital_phone: Joi.string().max(20),
    pharmacy_name: Joi.string().max(255),
    pharmacy_address: Joi.string().max(255),
    pharmacy_phone: Joi.string().max(20),
    pharmacy_fax: Joi.string().max(20),
    code_status: Joi.string().max(50),
    ssn: Joi.string().max(20),
    advance_directive: Joi.string().max(255),
    race: Joi.string().max(50),
    last_care_plan_date: Joi.date().iso(),
    gender: Joi.string().max(50),
    marital_status: Joi.string().max(50),
    language: Joi.string().max(50),
    living_situation: Joi.string()
      .required()
      .valid(...Object.values(LIVING_SITUATION)),
  }),
  emergency_contact: Joi.object({
    first_name: Joi.string().required().min(2).max(100),
    last_name: Joi.string().required().min(2).max(100),
    relationship: Joi.string().max(100),
    phone: Joi.string().max(20),
    email: Joi.string().max(255),
    address: Joi.string().max(255),
  }),
  medications: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      medication_name: Joi.string().required().min(2).max(255),
      dosage: Joi.string().required().max(100),
      purpose: Joi.string().max(255),
    })
  ),
  healthcare_providers: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      provider_type: Joi.string().required().max(100),
      provider_name: Joi.string().required().min(2).max(255),
      specialty: Joi.string().max(255),
      phone: Joi.string().max(20),
      address: Joi.string().max(255),
      last_visit: Joi.date().iso(),
      next_visit: Joi.date().iso(),
    })
  ),
  medical_info: Joi.object({
    allergies: Joi.string().max(255),
    diagnoses: Joi.string().max(255),
    surgical_history: Joi.string().max(255),
    dietary_restrictions: Joi.string().max(255),
    cognitive_status: Joi.string().max(255),
    last_cognitive_screening: Joi.date().iso(),
    cognitive_score: Joi.string().max(50),
    notes: Joi.string().max(255),
  }),
  vaccinations: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      name: Joi.string()
        .required()
        .valid(...Object.values(VACCINATION_TYPES)),
      date: Joi.date().iso(),
      next_vaccine: Joi.string().max(255),
    })
  ),
  home_health_agency: Joi.object({
    id: Joi.string().uuid().optional(),
    name: Joi.string().required().max(100),
    phone: Joi.string().max(20),
    address: Joi.string().max(255),
    fax: Joi.string().max(20),
    schedule: Joi.string().max(255),
    prescribing_doctor: Joi.string().max(255),
    start_date: Joi.date().iso(),
    discharge_date: Joi.date().iso(),
  }),
  bloodwork: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      name: Joi.string().required().max(100),
      date: Joi.date().iso(),
      results: Joi.string().max(255),
      ordered_by: Joi.string().max(255),
      repeat: Joi.string().max(255),
    })
  ),
  caregiver_agency: Joi.object({
    id: Joi.string().uuid().optional(),
    name: Joi.string().required().max(100),
    phone: Joi.string().max(20),
    address: Joi.string().max(255),
    point_of_contact: Joi.string().max(255),
    caregiver_schedule: Joi.string().max(255),
    caregiver_duties: Joi.string().max(255),
    important_information: Joi.string().max(255),
  }),
  medical_conditions: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      condition: Joi.string().required().max(255),
      onset_date: Joi.date().iso(),
      notes: Joi.string().max(255),
    })
  ),
  short_form: Joi.object({
    insurance: Joi.string().max(255),
    medicare: Joi.string().max(255),
    group_number: Joi.string().max(255),
    id_number: Joi.string().max(255),
    mpoa: Joi.string().max(255),
    mpoa_phone: Joi.string().max(255),
    mpoa_address: Joi.string().max(255),
    dpoa: Joi.string().max(255),
    dpoa_phone: Joi.string().max(255),
    dpoa_address: Joi.string().max(255),
  }),
});
