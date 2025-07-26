const Joi = require("joi");

exports.note_post = Joi.object({
  text: Joi.string().required(),
});

exports.note_put = Joi.object({
  text: Joi.string().required(),
});
