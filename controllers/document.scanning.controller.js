// const documentScanningService = require("../services/document.scanning.service");
// const awsTextract = require("../helpers/aws.textract");

// const multer = require('multer');

// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize: awsTextract.DOCUMENT_CONFIG.maxFileSize,
//   },
//   fileFilter: (req, file, cb) => {
//     if (awsTextract.DOCUMENT_CONFIG.allowedFileTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error(awsTextract.DOCUMENT_CONFIG.errorMessages.invalidFileType), false);
//     }
//   },
// }).single('document');

// module.exports.scan_document_post = async function scan_document_post(req, res) {
//   upload(req, res, async (err) => {
//     try {
//       if (err) {
//         res.fail(err.message);
//       }

//       if (!req.file) {
//         return res.fail('No document file uploaded');
//       }

//       console.log(`Processing uploaded file: ${req.file.originalname} (${req.file.size} bytes)`);

//       const result = await documentScanningService.scanDocument(req.file.buffer);

//       return res.success(
//         {       
//           text: result.text,
//           keyValuePairs: result.keyValuePairs,
//         }
//       )
//     } catch (error) {
//       console.error('Document scanning controller error:', error);
//       return res.serverError(error.message);
//     }
//   });
// }