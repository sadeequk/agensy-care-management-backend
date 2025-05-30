const Joi = require("joi");

exports.profile_put = Joi.object({
  first_name: Joi.string().trim().min(3).max(50),
  last_name: Joi.string().trim().min(3).max(50),
  phone: Joi.string().trim().max(20),
});
