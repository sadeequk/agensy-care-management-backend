const Joi = require("joi");
const { DOCUMENT_CATEGORIES } = require("../constants");

exports.document_post = Joi.object({
  client_id: Joi.string().uuid().required(),
  uploaded_by: Joi.string().uuid().required(),
  category: Joi.string()
    .valid(...Object.values(DOCUMENT_CATEGORIES))
    .required(),
  document_type: Joi.string().max(100).required(),
  title: Joi.string().max(255).required(),
  description: Joi.string().allow(""),
  file_size: Joi.number().integer(),
  file_type: Joi.string().max(100),
  file_url: Joi.string().max(2048),
  version: Joi.number().integer().default(1),
  active: Joi.boolean().default(true),
});

exports.document_put = Joi.object({
  category: Joi.string().valid(...Object.values(DOCUMENT_CATEGORIES)),
  document_type: Joi.string().max(100),
  title: Joi.string().max(255),
  description: Joi.string().allow(""),
  file_size: Joi.number().integer(),
  file_type: Joi.string().max(100),
  file_url: Joi.string().max(2048),
  version: Joi.number().integer(),
  active: Joi.boolean(),
});
