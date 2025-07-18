const express = require("express");
const router = express.Router();
const generalDocumentController = require("../controllers/general.document.controller");
const { uploadFile, deleteFile } = require("../helpers/aws.s3");

router.post("/", uploadFile, generalDocumentController.document_post);
router.get("/", generalDocumentController.documents_get);
router.get("/:documentId", generalDocumentController.document_get);
router.delete("/:documentId", deleteFile, generalDocumentController.document_delete);

module.exports = router;
