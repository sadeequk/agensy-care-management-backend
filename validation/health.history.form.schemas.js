const Joi = require("joi");

exports.health_history_post = Joi.object({
  medical_info: Joi.object({
    diagnoses: Joi.string().allow("").max(255).allow(null),
  }),
  medications: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional().allow(null),
      medication_name: Joi.string().optional().min(2).max(255).allow(null),
      dosage: Joi.string().optional().max(100).allow(null),
      prescribing_doctor: Joi.string().max(255).optional().allow(null),
      start_date: Joi.date().iso().optional().allow(null),
      end_date: Joi.date().iso().optional().allow(null),
    })
  ),
  healthcare_providers: Joi.object({
    provider_name: Joi.string().max(255).optional().allow(null),
    address: Joi.string().max(255).optional().allow(null),
    phone: Joi.string().max(20).optional().allow(null),
    notes: Joi.string().max(500).optional().allow(null),
    follow_up: Joi.string().max(255).optional().allow(null),
  }),
  home_health_agency: Joi.object({
    name: Joi.string().max(255).optional().allow(null),
    phone: Joi.string().max(20).optional().allow(null),
    address: Joi.string().max(255).optional().allow(null),
    fax: Joi.string().max(20).optional().allow(null),
    service_received: Joi.string().max(255).optional().allow(null),
    start_date: Joi.date().iso().optional().allow(null),
    discharge_date: Joi.date().iso().optional().allow(null),
  }),
  hospitalization: Joi.object({
    admitting_diagnosis: Joi.string().max(255).optional().allow(null),
    treatment: Joi.string().max(500).optional().allow(null),
  }),
  health_history: Joi.object({
    what_worked: Joi.string().max(500).optional().allow(null),
    date: Joi.date().iso().optional().allow(null),
    notes: Joi.string().max(1000).optional().allow(null),
    description_of_health_concern: Joi.string().max(1000).optional().allow(null),
    onset_of_symptoms: Joi.string().max(255).optional().allow(null),
    frequency_of_symptoms: Joi.string().max(255).optional().allow(null),
    severity_of_symptoms: Joi.string().max(255).optional().allow(null),
  }),
}); 