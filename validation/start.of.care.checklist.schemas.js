const Joi = require("joi");

exports.start_of_care_checklist_post = Joi.object({
  roi: Joi.string().max(1000).optional().allow(null),
  advance_directive: Joi.string().max(1000).optional().allow(null),
  ltc_authorization_form: Joi.boolean().optional().allow(null),
  code_status_notes: Joi.string().max(1000).optional().allow(null),
  appointments_on_calendar: Joi.boolean().optional().allow(null),
  recap_email_notes: Joi.string().max(1000).optional().allow(null),
}); 