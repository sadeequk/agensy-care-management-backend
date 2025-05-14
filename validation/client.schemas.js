const Joi = require("joi");
const { GENDER_TYPES, MARITAL_STATUS, LIVING_SITUATION } = require("../constants/index");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  relation: Joi.string().required(),
  phone: Joi.string().required(),
});

// Schema for creating a new client
exports.client_post = Joi.object({
  first_name: Joi.string().required().min(2).max(50),
  last_name: Joi.string().required().min(2).max(50),
  date_of_birth: Joi.string()
    .required()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .messages({
      "string.pattern.base": "date_of_birth must be in YYYY-MM-DD format",
    }),
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
}).strict();

// Schema for updating a client
exports.updateClientSchema = Joi.object({
  first_name: Joi.string().min(2).max(50),
  last_name: Joi.string().min(2).max(50),
  date_of_birth: Joi.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .messages({
      "string.pattern.base": "date_of_birth must be in YYYY-MM-DD format",
    }),
  gender: Joi.string().valid(...Object.values(GENDER_TYPES)),
  marital_status: Joi.string().valid(...Object.values(MARITAL_STATUS)),
  address: Joi.string().max(200),
  city: Joi.string().max(100),
  state: Joi.string().max(50),
  zip: Joi.string().max(20),
  living_situation: Joi.string().valid(...Object.values(LIVING_SITUATION)),
}).strict();

// Schema for updating client status
exports.updateClientStatusSchema = Joi.object({
  status: Joi.boolean().required(),
}).strict();
