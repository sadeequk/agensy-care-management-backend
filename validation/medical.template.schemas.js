const Joi = require('joi');

exports.medical_template_get = Joi.object({
  client_info: Joi.object({
    id: Joi.string().uuid().optional(),
    first_name: Joi.string().optional().max(255).allow(null),
    last_name: Joi.string().optional().max(255).allow(null),
    date_of_birth: Joi.date().iso().optional().allow(null),
  }),
});
exports.medical_template_post = Joi.object({
  medical_info: Joi.object({
    id: Joi.string().uuid().optional(),
    diagnoses: Joi.string().optional().max(500).allow(null),
    allergies: Joi.string().optional().max(500).allow(null),
    surgical_history: Joi.string().optional().max(500).allow(null),
    height: Joi.string().optional().max(50).allow(null),
    weight: Joi.string().optional().max(50).allow(null),
    blood_pressure: Joi.string().optional().max(50).allow(null),
    temperature: Joi.string().optional().max(50).allow(null),
    heart_rate: Joi.string().optional().max(50).allow(null),
    additional_vitals: Joi.string().optional().max(255).allow(null),
  }),

  medications: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      medication_name: Joi.string().optional().min(2).max(255).allow(null),
      dosage: Joi.string().optional().max(100).allow(null),
      frequency: Joi.string().optional().max(100).allow(null),
      notes: Joi.string().optional().max(255).allow(null),
      prescribing_doctor: Joi.string().optional().max(255).allow(null),
      start_date: Joi.date().iso().optional().allow(null),
      end_date: Joi.date().iso().optional().allow(null),
    })
  ),

  healthcare_providers: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      provider_name: Joi.string().optional().min(2).max(255).allow(null),
      address: Joi.string().optional().max(255).allow(null),
      phone: Joi.string().optional().max(20).allow(null),
      notes: Joi.string().optional().max(500).allow(null),
      follow_up: Joi.string().optional().max(255).allow(null),
      specialty: Joi.string().optional().max(255).allow(null),
    })
  ),

  medical_template: Joi.object({
    id: Joi.string().uuid().optional(),
    date: Joi.date().iso().optional().allow(null),
    reason_for_visit: Joi.string().optional().max(500).allow(null),
    top_3_concerns: Joi.string().optional().max(500).allow(null),
    tests_labs_imaging: Joi.string().optional().max(500).allow(null),
    visit_notes: Joi.string().optional().max(1000).allow(null),
    recommendations: Joi.string().optional().max(500).allow(null),
    referrals: Joi.string().optional().max(500).allow(null),
    follow_up: Joi.string().optional().max(255).allow(null),
    report_given_to: Joi.string().optional().max(500).allow(null),
  }),
});
