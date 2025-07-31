const express = require("express");
const router = express.Router();
const documentScanningController = require("../controllers/document.scanning.controller");
const { upload } = require("../helpers/aws.textract");

router.post("/", upload, documentScanningController.scan_document_post);

router.get("/", (req, res) => {
  res.success("document.scanning", { title: "Agensy Care Management - Document Scanning" });
});

module.exports = router;
