const Joi = require("joi");

const care_recipient_questionnaire_post = Joi.object({
  client_info: Joi.object({
    first_name: Joi.string().optional(),
    last_name: Joi.string().optional(),
    ssn: Joi.string().optional(),
    date_of_birth: Joi.date().optional(),
    phone: Joi.string().optional(),
    address: Joi.string().optional(),
    preferred_hospital: Joi.string().optional(),
    hospital_address: Joi.string().optional(),
    hospital_phone: Joi.string().optional(),
    pharmacy_name: Joi.string().optional(),
    pharmacy_address: Joi.string().optional(),
    pharmacy_phone: Joi.string().optional(),
    pharmacy_fax: Joi.string().optional(),
    code_status: Joi.string().optional(),
    advance_directive: Joi.string().optional(),
  }).optional(),

  medical_info: Joi.object({
    allergies: Joi.string().optional(),
    diagnoses: Joi.string().optional(),
    surgical_history: Joi.string().optional(),
  }).optional(),

  emergency_contact: Joi.object({
    first_name: Joi.string().optional(),
    last_name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
    relationship: Joi.string().optional(),
    address: Joi.string().optional(),
  }).optional(),

  medications: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      medication_name: Joi.string().optional(),
      dosage: Joi.string().optional(),
      purpose: Joi.string().optional(),
      prescribing_doctor: Joi.string().optional(),
      refill_due: Joi.date().optional(),
    })
  ).optional(),

  healthcare_providers: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      provider_type: Joi.string().optional(),
      provider_name: Joi.string().optional(),
      specialty: Joi.string().optional(),
      address: Joi.string().optional(),
      phone: Joi.string().optional(),
      last_visit: Joi.date().optional(),
      next_visit: Joi.date().optional(),
    })
  ).optional(),

  questionnaire: Joi.object({
    preferred_name: Joi.string().optional(),
    date_of_birth: Joi.date().optional(),
    gender: Joi.string().valid("male", "female", "other").optional(),
    marital_status: Joi.string().valid("single", "married", "divorced", "widowed").optional(),
    living_situation: Joi.string().valid("independent", "assisted", "nursing", "family").optional(),
    emergency_contact_name: Joi.string().optional(),
    emergency_contact_phone: Joi.string().optional(),
    emergency_contact_relationship: Joi.string().optional(),
    primary_physician: Joi.string().optional(),
    physician_phone: Joi.string().optional(),
    allergies: Joi.string().optional(),
    current_medications: Joi.string().optional(),
    medical_conditions: Joi.string().optional(),
    preferred_care_time: Joi.string().optional(),
    care_preferences: Joi.string().optional(),
    mobility_assistance: Joi.boolean().optional(),
    personal_care_assistance: Joi.boolean().optional(),
    medication_management: Joi.boolean().optional(),
    meal_preparation: Joi.boolean().optional(),
    housekeeping: Joi.boolean().optional(),
    transportation: Joi.boolean().optional(),
    special_instructions: Joi.string().optional(),
    cultural_preferences: Joi.string().optional(),
    language_preference: Joi.string().optional(),
    religious_preferences: Joi.string().optional(),
    insurance_provider: Joi.string().optional(),
    insurance_policy_number: Joi.string().optional(),
    medicare_number: Joi.string().optional(),
    medicaid_number: Joi.string().optional(),
  }).optional(),
});

module.exports = {
  care_recipient_questionnaire_post,
}; 