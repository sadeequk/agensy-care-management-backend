// const Joi = require("joi");

// exports.document_scanning_post = Joi.object({
//   document_type: Joi.string().valid('general', 'medical', 'financial', 'legal', 'insurance', 'prescription', 'lab_report', 'billing', 'contract', 'invoice').optional().default('general').messages({
//     'any.only': 'Document type must be one of: general, medical, financial, legal, insurance, prescription, lab_report, billing, contract, invoice',
//   }),
//   extract_signatures: Joi.boolean().optional().default(false),
//   extract_tables: Joi.boolean().optional().default(true),
//   extract_forms: Joi.boolean().optional().default(true),
//   confidence_threshold: Joi.number().min(0).max(100).optional().default(80).messages({
//     'number.min': 'Confidence threshold must be between 0 and 100',
//     'number.max': 'Confidence threshold must be between 0 and 100',
//   }),
//   custom_extraction_rules: Joi.object().optional().default({}),
// }); 