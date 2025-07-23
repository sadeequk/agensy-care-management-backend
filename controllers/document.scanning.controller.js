const scanningService = require('../services/document.scanning.service');

exports.scan_document_post = async (req, res) => {
  try {
    if (!req.file) return res.fail('No document uploaded');
    console.log('Uploaded mimetype:', req.file.mimetype);
    const result = await scanningService.scanDocument(req.file.buffer, req.file.mimetype);

    return res.success({
      keyValuePairs: result.keyValuePairs,
      fullText: result.text
    });
  } catch (err) {
    console.error('Scan error:', err);
    return res.serverError(err.message);
  }
};
