const Joi = require("joi");
const { CHECKLIST_TYPES } = require("../constants");

exports.form_type = Joi.string().valid(...Object.values(CHECKLIST_TYPES)).required();

