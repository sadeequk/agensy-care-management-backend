const Joi = require("joi");

exports.profile_put = Joi.object({
  first_name: Joi.string().trim(),
  last_name: Joi.string().trim(),
  phone: Joi.string().trim(),
});
