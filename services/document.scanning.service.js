const awsTextract = require("../helpers/aws.textract");
const claudeService = require("./claude.service");

exports.scanDocument = async (buffer, mimetype) => {
  return awsTextract.scanDocument(buffer, mimetype);
};

exports.scanDocumentWithAI = async (buffer, mimetype) => {
  try {
    // Step 1: Extract text and key-value pairs using AWS Textract
    const textractResults = await awsTextract.scanDocument(buffer, mimetype);

    // Step 2: Detect document type using Claude AI
    const documentType = await claudeService.detectDocumentType(textractResults);

    // Step 3: Map fields to standardized schema using Claude AI
    const mappedFields = await claudeService.mapDocumentFields(textractResults, documentType);

    return {
      documentType,
      mappedFields,
      rawTextractResults: textractResults,
      success: true,
    };
  } catch (error) {
    console.error("AI document scanning error:", error);
    throw error;
  }
};
