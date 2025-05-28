const Joi = require("joi");
const { APPOINTMENT_TYPES } = require("../constants/index");

exports.appointment_post = Joi.object({
  title: Joi.string().max(255).required(),
  appointment_type: Joi.string()
    .valid(...Object.values(APPOINTMENT_TYPES))
    .required(),
  location: Joi.string().max(255).allow(null, ""),
  start_time: Joi.date().required(),
  end_time: Joi.date().required(),
  notes: Joi.string().allow(""),
});

exports.appointment_put = Joi.object({
  title: Joi.string().max(255),
  appointment_type: Joi.string()
    .valid(...Object.values(APPOINTMENT_TYPES))
    .required(),
  location: Joi.string().max(255).allow(null, ""),
  start_time: Joi.date(),
  end_time: Joi.date(),
  notes: Joi.string().allow(""),
  active: Joi.boolean(),
});
