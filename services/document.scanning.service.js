const awsTextract = require("../helpers/aws.textract");
const claudeService = require("./claude.service");

exports.scanDocumentWithAI = async (buffer, mimetype, documentType) => {
  try {
    const textractResults = await awsTextract.scanDocument(buffer, mimetype);

    console.log("Using provided document type:", documentType);

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
