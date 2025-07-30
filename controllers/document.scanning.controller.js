const scanningService = require("../services/document.scanning.service");

exports.scan_document_post = async (req, res) => {
  try {
    console.log("Uploaded mimetype:", req.file.mimetype);
    const result = await scanningService.scanDocument(req.file.buffer, req.file.mimetype);

    return res.success({
      keyValuePairs: result.keyValuePairs,
      fullText: result.text,
    });
  } catch (err) {
    console.error("Scan error:", err);
    return res.serverError(err.message);
  }
};

exports.scan_document_with_ai_post = async (req, res) => {
  try {
    console.log("AI Document scanning - Uploaded mimetype:", req.file.mimetype);
    console.log("File size:", req.file.size, "bytes");

    const result = await scanningService.scanDocumentWithAI(req.file.buffer, req.file.mimetype);

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
