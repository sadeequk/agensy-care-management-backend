const Joi = require("joi");
const { THREAD_TYPES, THREAD_SUB_TYPES } = require("../constants");

module.exports.thread_post = Joi.object({
  client_id: Joi.string()
    .uuid()
    .when("type", {
      is: THREAD_TYPES.CLIENT,
      then: Joi.required().messages({
        "any.required": "Client ID is required for client threads",
      }),
      otherwise: Joi.allow(null),
    }),
  type: Joi.string()
    .valid(...Object.values(THREAD_TYPES))
    .required(),
  participant_id: Joi.string().uuid().required(),
  sub_type: Joi.string()
    .valid(...Object.values(THREAD_SUB_TYPES))
    .required(),
});
