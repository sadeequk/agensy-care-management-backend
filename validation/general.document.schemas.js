const Joi = require("joi");
const { DOCUMENT_CATEGORIES, DOCUMENT_UPLOAD_TYPES } = require("../constants");

exports.document_post = Joi.object({
  client_id: Joi.string().uuid().allow(null),
  uploaded_by: Joi.string().uuid().required(),
  upload_type: Joi.string()
    .valid(...Object.values(DOCUMENT_UPLOAD_TYPES))
    .default(DOCUMENT_UPLOAD_TYPES.GENERAL),
  category: Joi.string()
    .valid(...Object.values(DOCUMENT_CATEGORIES))
    .required(),
  document_type: Joi.string().required(),
  primary_user_id: Joi.string().uuid().required(),
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  file_size: Joi.number().integer(),
  file_type: Joi.string(),
  file_name: Joi.string(),
  version: Joi.number().integer().default(1),
  active: Joi.boolean().default(true),
});

exports.document_put = Joi.object({
  upload_type: Joi.string().valid(...Object.values(DOCUMENT_UPLOAD_TYPES)),
  category: Joi.string().valid(...Object.values(DOCUMENT_CATEGORIES)),
  primary_user_id: Joi.string().uuid().required(),
  document_type: Joi.string(),
  title: Joi.string(),
  description: Joi.string().allow(""),
  file_size: Joi.number().integer(),
  file_type: Joi.string(),
  file_name: Joi.string(),
  version: Joi.number().integer(),
  active: Joi.boolean(),
});
