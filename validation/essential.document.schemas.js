const Joi = require("joi");

exports.essential_document_post = Joi.object({
  essential_documents: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().optional(),
      category: Joi.string().optional().allow(null),
      document_name: Joi.string().optional().allow(null),
      in_place: Joi.boolean().optional().allow(null),
      notes: Joi.string().optional().allow(null),
    })
  ),
});
