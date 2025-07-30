const Joi = require("joi");

const scanDocumentSchema = Joi.object({
  // No body validation needed as it's file upload
});

const scanDocumentWithAISchema = Joi.object({
  // No body validation needed as it's file upload
  // The document type will be automatically detected by Claude AI
});

module.exports = {
  scanDocumentSchema,
  scanDocumentWithAISchema,
};
