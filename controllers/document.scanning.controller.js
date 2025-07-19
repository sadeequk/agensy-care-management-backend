const documentScanningService = require("../services/document.scanning.service");

module.exports.scan_document_post = async function scan_document_post(req, res) {
  try {
    if (!req.file) {
      return res.fail('No document file uploaded');
    }

    console.log(`Processing uploaded file: ${req.file.originalname} (${req.file.size} bytes)`);

    const result = await documentScanningService.scanDocument(req.file.buffer);

    return res.success({
      text: result.text,
      keyValuePairs: result.keyValuePairs,
    });
  } catch (error) {
    console.error('Document scanning controller error:', error);
    
    // if (error.code === 'LIMIT_FILE_SIZE') {
    //   return res.fail('File too large. Maximum size is 20MB');
    // }
    // if (error.message && error.message.includes('Invalid file type')) {
    //   return res.fail(error.message);
    // }
    
    return res.serverError(error.message);
  }
};