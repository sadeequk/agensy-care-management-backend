const Joi = require("joi");
const { GENDER_TYPES, MARITAL_STATUS, LIVING_SITUATION } = require("../constants/index");

exports.client_post = Joi.object({
  first_name: Joi.string().optional().allow(null),
  last_name: Joi.string().optional().allow(null),
  date_of_birth: Joi.date().iso().optional().allow(null),
  gender: Joi.string()
    .optional()
    .valid(...Object.values(GENDER_TYPES))
    .allow(null),
  marital_status: Joi.string()
    .optional()
    .valid(...Object.values(MARITAL_STATUS))
    .allow(null),
  address: Joi.string().optional().allow(null),
  city: Joi.string().optional().allow(null),
  state: Joi.string().optional().allow(null),
  zip: Joi.string().optional().allow(null),
  living_situation: Joi.string()
    .optional()
    .valid(...Object.values(LIVING_SITUATION))
    .allow(null),
  preferred_hospital: Joi.string().optional().allow(null),
  hospital_address: Joi.string().optional().allow(null),
  hospital_phone: Joi.string().optional().allow(null),
  pharmacy_name: Joi.string().optional().allow(null),
  pharmacy_address: Joi.string().optional().allow(null),
  pharmacy_phone: Joi.string().optional().allow(null),
  pharmacy_fax: Joi.string().optional().allow(null),
  race: Joi.string().optional().allow(null),
  last_care_plan_date: Joi.date().iso().optional(),
});

exports.client_put = Joi.object({
  first_name: Joi.string().optional().allow(null),
  last_name: Joi.string().optional().allow(null),
  date_of_birth: Joi.date().iso().optional().allow(null),
  gender: Joi.string()
    .optional()
    .valid(...Object.values(GENDER_TYPES))
    .allow(null),
  marital_status: Joi.string()
    .optional()
    .valid(...Object.values(MARITAL_STATUS))
    .allow(null),
  address: Joi.string().optional().allow(null),
  city: Joi.string().optional().allow(null),
  state: Joi.string().optional().allow(null),
  zip: Joi.string().optional().allow(null),
  living_situation: Joi.string()
    .optional()
    .valid(...Object.values(LIVING_SITUATION))
    .allow(null),
  race: Joi.string().optional().allow(null),
  last_care_plan_date: Joi.date().iso().optional().allow(null),
});

exports.updateClientStatusSchema = Joi.object({
  status: Joi.boolean().required(),
});

exports.hospital_pharmacy_put = Joi.object({
  preferred_hospital: Joi.string().optional().allow(null),
  hospital_address: Joi.string().optional().allow(null),
  hospital_phone: Joi.string().optional().allow(null),
  pharmacy_name: Joi.string().optional().allow(null),
  pharmacy_address: Joi.string().optional().allow(null),
  pharmacy_phone: Joi.string().optional().allow(null),
  pharmacy_fax: Joi.string().optional().allow(null),
});
