const Joi = require("joi");

exports.document_post = Joi.object({
  client_id: Joi.string().uuid().required(),
  uploaded_by: Joi.string().uuid().required(),
  category_id: Joi.string().uuid().required(),
  document_type: Joi.string().max(100).required(),
  title: Joi.string().max(255).required(),
  description: Joi.string().allow(""),
  s3_bucket: Joi.string().max(255).required(),
  //   s3_key: Joi.string().max(255),
  file_size: Joi.number().integer().required(),
  file_type: Joi.string().max(50).required(),
  file_url: Joi.string().max(2048),
  version: Joi.number().integer().default(1),
  active: Joi.boolean().default(true),
});

exports.document_put = Joi.object({
  category_id: Joi.string().uuid(),
  document_type: Joi.string().max(100),
  title: Joi.string().max(255),
  description: Joi.string().allow(""),
  s3_bucket: Joi.string().max(255),
  //   s3_key: Joi.string().max(255),
  file_size: Joi.number().integer(),
  file_type: Joi.string().max(50),
  file_url: Joi.string().max(2048),
  version: Joi.number().integer(),
  active: Joi.boolean(),
});
