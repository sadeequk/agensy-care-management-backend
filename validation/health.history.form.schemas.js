const Joi = require("joi");

exports.health_history_post = Joi.object({
  medical_info: Joi.object({
    diagnoses: Joi.string().allow("").max(255),
  }),
  medications: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      medication_name: Joi.string().required().min(2).max(255),
      dosage: Joi.string().required().max(100),
      prescribing_doctor: Joi.string().max(255),
      start_date: Joi.date().iso(),
      end_date: Joi.date().iso(),
    })
  ),
  healthcare_providers: Joi.object({
    provider_name: Joi.string().max(255),
    address: Joi.string().max(255),
    phone: Joi.string().max(20),
    notes: Joi.string().max(500),
    follow_up: Joi.string().max(255),
  }),
  home_health_agency: Joi.object({
    name: Joi.string().max(255),
    phone: Joi.string().max(20),
    address: Joi.string().max(255),
    fax: Joi.string().max(20),
    service_received: Joi.string().max(255),
    start_date: Joi.date().iso(),
    discharge_date: Joi.date().iso(),
  }),
  hospitalization: Joi.object({
    admitting_diagnosis: Joi.string().max(255),
    treatment: Joi.string().max(500),
  }),
  health_history: Joi.object({
    what_worked: Joi.string().max(500),
    date: Joi.date().iso(),
    notes: Joi.string().max(1000),
    description_of_health_concern: Joi.string().max(1000),
    onset_of_symptoms: Joi.string().max(255),
    frequency_of_symptoms: Joi.string().max(255),
    severity_of_symptoms: Joi.string().max(255),
  }),
}); 