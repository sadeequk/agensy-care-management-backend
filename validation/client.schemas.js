const Joi = require("joi");
const { GENDER_TYPES, MARITAL_STATUS, LIVING_SITUATION } = require("../constants/index");

exports.client_post = Joi.object({
  first_name: Joi.string().optional().min(2).max(50),
  last_name: Joi.string().optional().min(2).max(50),
  date_of_birth: Joi.date().iso().optional(),
  gender: Joi.string()
    .optional()
    .valid(...Object.values(GENDER_TYPES)),
  marital_status: Joi.string()
    .optional()
    .valid(...Object.values(MARITAL_STATUS)),
  address: Joi.string().optional().max(200),
  city: Joi.string().optional().max(100),
  state: Joi.string().optional().max(50),
  zip: Joi.string().optional().max(20),
  living_situation: Joi.string()
    .optional()
    .valid(...Object.values(LIVING_SITUATION)),
  preferred_hospital: Joi.string().max(200).optional(),
  hospital_address: Joi.string().max(200).optional(),
  hospital_phone: Joi.string().max(20).optional(),
  pharmacy_name: Joi.string().max(200).optional(),
  pharmacy_address: Joi.string().max(200).optional(),
  pharmacy_phone: Joi.string().max(20).optional(),
  pharmacy_fax: Joi.string().max(20).optional(),
  race: Joi.string().max(50).optional(),
  last_care_plan_date: Joi.date().iso().optional(),
});

exports.client_put = Joi.object({
  first_name: Joi.string().min(2).max(50).optional(),
  last_name: Joi.string().min(2).max(50).optional(),
  date_of_birth: Joi.date().iso().optional(),
  gender: Joi.string().optional().valid(...Object.values(GENDER_TYPES)),
  marital_status: Joi.string().optional().valid(...Object.values(MARITAL_STATUS)),
  address: Joi.string().max(200).optional(),
  city: Joi.string().max(100).optional(),
  state: Joi.string().max(50).optional(),
  zip: Joi.string().max(20).optional(),
  living_situation: Joi.string().optional().valid(...Object.values(LIVING_SITUATION)),
  race: Joi.string().max(50).optional(),
  last_care_plan_date: Joi.date().iso().optional(),
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
