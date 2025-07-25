const Joi = require('joi');

exports.health_history_post = Joi.object({
  medical_info: Joi.object({
    id: Joi.string().uuid().optional(),
    diagnoses: Joi.string().optional().allow(null),
  }),

  medications: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      medication_name: Joi.string().required(),
      dosage: Joi.string().optional().allow(null),
      frequency: Joi.string().optional().allow(null),
      prescribing_doctor: Joi.string().optional().allow(null),
      start_date: Joi.date().iso().optional().allow(null),
      end_date: Joi.date().iso().optional().allow(null),
    })
  ),

  healthcare_providers: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      provider_name: Joi.string().optional().allow(null),
      address: Joi.string().optional().allow(null),
      phone: Joi.string().optional().allow(null),
      notes: Joi.string().optional().allow(null),
      follow_up: Joi.string().optional().allow(null),
    })
  ),

  home_health_agency: Joi.object({
    id: Joi.string().uuid().optional(),
    name: Joi.string().optional().allow(null),
    phone: Joi.string().optional().allow(null),
    address: Joi.string().optional().allow(null),
    fax: Joi.string().optional().allow(null),
    service_received: Joi.string().optional().allow(null),
    start_date: Joi.date().iso().optional().allow(null),
    discharge_date: Joi.date().iso().optional().allow(null),
  }),

  health_history: Joi.object({
    id: Joi.string().uuid().optional(),
    date: Joi.date().iso().optional().allow(null),
    description_of_health_concern: Joi.string().optional().allow(null),
    admitting_diagnosis: Joi.string().optional().allow(null),
    treatment: Joi.string().optional().allow(null),
    onset_of_symptoms: Joi.string().optional().allow(null),
    frequency_of_symptoms: Joi.string().optional().allow(null),
    severity_of_symptoms: Joi.string().optional().allow(null),
    what_worked: Joi.string().optional().allow(null),
    notes: Joi.string().optional().allow(null),
  }),
});
