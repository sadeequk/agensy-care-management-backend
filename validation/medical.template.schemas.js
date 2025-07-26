const Joi = require("joi");

exports.medical_template_post = Joi.object({
  client_info: Joi.object({
    id: Joi.string().uuid().optional(),
    first_name: Joi.string().optional().allow(null),
    last_name: Joi.string().optional().allow(null),
    date_of_birth: Joi.date().iso().optional().allow(null),
  }),
  medical_info: Joi.object({
    id: Joi.string().uuid().optional(),
    diagnoses: Joi.string().optional().allow(null),
    allergies: Joi.string().optional().allow(null),
    surgical_history: Joi.string().optional().allow(null),
    height: Joi.string().optional().allow(null),
    weight: Joi.string().optional().allow(null),
    blood_pressure: Joi.string().optional().allow(null),
    temperature: Joi.string().optional().allow(null),
    heart_rate: Joi.string().optional().allow(null),
    additional_vitals: Joi.string().optional().allow(null),
  }),
  medications: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      medication_name: Joi.string().optional().allow(null),
      dosage: Joi.string().optional().allow(null),
      frequency: Joi.string().optional().allow(null),
      notes: Joi.string().optional().allow(null),
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
      specialty: Joi.string().optional().allow(null),
    })
  ),
  medical_template: Joi.object({
    id: Joi.string().uuid().optional(),
    date: Joi.date().iso().optional().allow(null),
    reason_for_visit: Joi.string().optional().allow(null),
    top_3_concerns: Joi.string().optional().allow(null),
    tests_labs_imaging: Joi.string().optional().allow(null),
    visit_notes: Joi.string().optional().allow(null),
    recommendations: Joi.string().optional().allow(null),
    referrals: Joi.string().optional().allow(null),
    follow_up: Joi.string().optional().allow(null),
    report_given_to: Joi.string().optional().allow(null),
  }),
});
