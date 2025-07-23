const express = require("express");
const router = express.Router();
const documentScanningController = require("../controllers/document.scanning.controller");
const { upload } = require('../helpers/aws.textract');

router.post("/scan", upload, documentScanningController.scan_document_post);

module.exports = router;               