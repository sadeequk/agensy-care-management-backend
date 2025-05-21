const Joi = require("joi");

exports.document_post = Joi.object({
  uploaded_by: Joi.string().uuid().required(),
  category_id: Joi.string().uuid().allow(null),
  document_type: Joi.string().max(100).required(),
  title: Joi.string().max(255).required(),
  description: Joi.string().allow(""),
  file_size: Joi.number().integer(),
  file_type: Joi.string().max(100).valid("application/pdf", "image/jpeg", "image/png", "image/gif").messages({
    "any.only": "Invalid file type: {#value}. Only PDF and image files (JPEG, PNG, GIF) are allowed.",
  }),
  file_url: Joi.string().max(2048),
  version: Joi.number().integer().default(1),
  active: Joi.boolean().default(true),
});

exports.document_put = Joi.object({
  category_id: Joi.string().uuid().allow(null),
  document_type: Joi.string().max(100),
  title: Joi.string().max(255),
  description: Joi.string().allow(""),
  file_size: Joi.number().integer(),
  file_type: Joi.string().max(100).valid("application/pdf", "image/jpeg", "image/png", "image/gif").messages({
    "any.only": "Invalid file type: {#value}. Only PDF and image files (JPEG, PNG, GIF) are allowed.",
  }),
  file_url: Joi.string().max(2048),
  version: Joi.number().integer(),
  active: Joi.boolean(),
});
