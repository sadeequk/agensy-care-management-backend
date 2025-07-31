const scanningService = require("../services/document.scanning.service");
const { OCR_DOCUMENT_TYPES } = require("../constants");

exports.scan_document_post = async (req, res) => {
  try {
    if (!req.file) {
      return res.fail("No file uploaded. Please upload a document file with field name 'document'");
    }

    if (!req.body.document_type) {
      return res.fail("Document type is required. Please provide 'document_type' field");
    }

    const documentType = req.body.document_type;
    const validDocumentTypes = Object.values(OCR_DOCUMENT_TYPES);

    if (!validDocumentTypes.includes(documentType)) {
      return res.fail("Invalid document type. Please select: " + validDocumentTypes.join(", "));
    }

    const result = await scanningService.scanDocumentWithAI(req.file.buffer, req.file.mimetype, documentType);

    return res.success({
      documentType: result.documentType,
      mappedFields: result.mappedFields,
      rawTextractResults: {
        keyValuePairs: result.rawTextractResults.keyValuePairs,
        fullText: result.rawTextractResults.text,
      },
      success: result.success,
    });
  } catch (err) {
    console.error("AI Scan error:", err);
    return res.serverError(err.message);
  }
};
