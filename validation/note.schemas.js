const Joi = require("joi");

exports.note_post = Joi.object({
  text: Joi.string().required().min(1).max(5000),
});

exports.note_put = Joi.object({
  text: Joi.string().required().min(1).max(5000),
});
