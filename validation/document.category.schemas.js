const Joi = require("joi");

exports.category_post = Joi.object({
  name: Joi.string().required().max(100),
  description: Joi.string().allow(""),
  default_access_level: Joi.string().max(50).default("limited"),
  active: Joi.boolean().default(true),
});

exports.category_put = Joi.object({
  name: Joi.string().max(100),
  description: Joi.string().allow(""),
  default_access_level: Joi.string().max(50),
  active: Joi.boolean(),
});
