const Joi = require("joi");
const { GENDER_TYPES, MARITAL_STATUS, LIVING_SITUATION } = require("../constants/index");

exports.client_post = Joi.object({
  first_name: Joi.string().optional().min(2).max(50).allow(null),
  last_name: Joi.string().optional().min(2).max(50).allow(null),
  date_of_birth: Joi.date().iso().optional().allow(null),
  gender: Joi.string()
    .optional()
    .valid(...Object.values(GENDER_TYPES)),
  marital_status: Joi.string()
    .optional()
    .valid(...Object.values(MARITAL_STATUS)),
  address: Joi.string().optional().max(200).allow(null),
  city: Joi.string().optional().max(100).allow(null),
  state: Joi.string().optional().max(50).allow(null),
  zip: Joi.string().optional().max(20).allow(null),
  living_situation: Joi.string()
    .optional()
    .valid(...Object.values(LIVING_SITUATION)),
  preferred_hospital: Joi.string().max(200).optional().allow(null),
  hospital_address: Joi.string().max(200).optional().allow(null),
  hospital_phone: Joi.string().max(20).optional().allow(null),
  pharmacy_name: Joi.string().max(200).optional().allow(null),
  pharmacy_address: Joi.string().max(200).optional().allow(null),
  pharmacy_phone: Joi.string().max(20).optional().allow(null),
  pharmacy_fax: Joi.string().max(20).optional().allow(null),
  race: Joi.string().max(50).optional().allow(null),
  last_care_plan_date: Joi.date().iso().optional(),
});

exports.client_put = Joi.object({
  first_name: Joi.string().min(2).max(50).optional().allow(null),
  last_name: Joi.string().min(2).max(50).optional().allow(null),
  date_of_birth: Joi.date().iso().optional().allow(null),
  gender: Joi.string().optional().valid(...Object.values(GENDER_TYPES)).allow(null),
  marital_status: Joi.string().optional().valid(...Object.values(MARITAL_STATUS)).allow(null),
  address: Joi.string().max(200).optional().allow(null),
  city: Joi.string().max(100).optional().allow(null),
  state: Joi.string().max(50).optional().allow(null),
  zip: Joi.string().max(20).optional().allow(null),
  living_situation: Joi.string().optional().valid(...Object.values(LIVING_SITUATION)).allow(null),
  race: Joi.string().max(50).optional().allow(null),
  last_care_plan_date: Joi.date().iso().optional().allow(null),
});

exports.updateClientStatusSchema = Joi.object({
  status: Joi.boolean().required(),
});

exports.hospital_pharmacy_put = Joi.object({
  preferred_hospital: Joi.string().max(200).optional().allow(null),
  hospital_address: Joi.string().max(200).optional().allow(null),
  hospital_phone: Joi.string().max(20).optional().allow(null),
  pharmacy_name: Joi.string().max(200).optional().allow(null),
  pharmacy_address: Joi.string().max(200).optional().allow(null),
  pharmacy_phone: Joi.string().max(20).optional().allow(null),
  pharmacy_fax: Joi.string().max(20).optional().allow(null),
});
