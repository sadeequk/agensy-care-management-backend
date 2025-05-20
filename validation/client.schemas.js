const Joi = require("joi");
const { GENDER_TYPES, MARITAL_STATUS, LIVING_SITUATION } = require("../constants/index");

exports.client_post = Joi.object({
  first_name: Joi.string().required().min(2).max(50),
  last_name: Joi.string().required().min(2).max(50),
  // date_of_birth: Joi.string()
  //   .required()
  //   .regex(/^\d{4}-\d{2}-\d{2}$/)
  //   .messages({
  //     "string.pattern.base": "date_of_birth must be in YYYY-MM-DD format",
  //   }),
  date_of_birth: Joi.date().iso().required(),
  gender: Joi.string()
    .required()
    .valid(...Object.values(GENDER_TYPES)),
  marital_status: Joi.string()
    .required()
    .valid(...Object.values(MARITAL_STATUS)),
  address: Joi.string().required().max(200),
  city: Joi.string().required().max(100),
  state: Joi.string().required().max(50),
  zip: Joi.string().required().max(20),
  living_situation: Joi.string()
    .required()
    .valid(...Object.values(LIVING_SITUATION)),
  preferred_hospital: Joi.string().max(200),
  hospital_address: Joi.string().max(200),
  hospital_phone: Joi.string().max(20),
  pharmacy_name: Joi.string().max(200),
  pharmacy_address: Joi.string().max(200),
  pharmacy_phone: Joi.string().max(20),
  pharmacy_fax: Joi.string().max(20),
});

exports.client_put = Joi.object({
  first_name: Joi.string().min(2).max(50),
  last_name: Joi.string().min(2).max(50),
  // date_of_birth: Joi.string()
  //   .regex(/^\d{4}-\d{2}-\d{2}$/)
  //   .messages({
  //     "string.pattern.base": "date_of_birth must be in YYYY-MM-DD format",
  //   }),
  date_of_birth: Joi.date().iso().required(),
  gender: Joi.string().valid(...Object.values(GENDER_TYPES)),
  marital_status: Joi.string().valid(...Object.values(MARITAL_STATUS)),
  address: Joi.string().max(200),
  city: Joi.string().max(100),
  state: Joi.string().max(50),
  zip: Joi.string().max(20),
  living_situation: Joi.string().valid(...Object.values(LIVING_SITUATION)),
});

exports.updateClientStatusSchema = Joi.object({
  status: Joi.boolean().required(),
});

exports.hospital_pharmacy_put = Joi.object({
  preferred_hospital: Joi.string().max(200),
  hospital_address: Joi.string().max(200),
  hospital_phone: Joi.string().max(20),
  pharmacy_name: Joi.string().max(200),
  pharmacy_address: Joi.string().max(200),
  pharmacy_phone: Joi.string().max(20),
  pharmacy_fax: Joi.string().max(20),
});
