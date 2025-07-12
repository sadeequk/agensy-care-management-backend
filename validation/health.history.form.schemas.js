const Joi = require("joi");

exports.health_history_post = Joi.object({
  medical_info: Joi.object({
    diagnoses: Joi.string().allow("").max(255).allow(null),
  }),
  medications: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      medication_name: Joi.string().optional().min(2).max(255),
      dosage: Joi.string().optional().max(100),
      prescribing_doctor: Joi.string().max(255).optional(),
      start_date: Joi.date().iso().optional(),
      end_date: Joi.date().iso().optional(),
    })
  ),
  healthcare_providers: Joi.object({
    provider_name: Joi.string().max(255).optional(),
    address: Joi.string().max(255).optional(),
    phone: Joi.string().max(20).optional(),
    notes: Joi.string().max(500).optional(),
    follow_up: Joi.string().max(255).optional(),
  }),
  home_health_agency: Joi.object({
    name: Joi.string().max(255).optional(),
    phone: Joi.string().max(20).optional(),
    address: Joi.string().max(255).optional(),
    fax: Joi.string().max(20).optional(),
    service_received: Joi.string().max(255).optional(),
    start_date: Joi.date().iso().optional(),
    discharge_date: Joi.date().iso().optional(),
  }),
  hospitalization: Joi.object({
    admitting_diagnosis: Joi.string().max(255).optional(),
    treatment: Joi.string().max(500).optional(),
  }),
  health_history: Joi.object({
    what_worked: Joi.string().max(500).optional(),
    date: Joi.date().iso().optional(),
    notes: Joi.string().max(1000).optional(),
    description_of_health_concern: Joi.string().max(1000).optional(),
    onset_of_symptoms: Joi.string().max(255).optional(),
    frequency_of_symptoms: Joi.string().max(255).optional(),
    severity_of_symptoms: Joi.string().max(255).optional(),
  }),
}); 