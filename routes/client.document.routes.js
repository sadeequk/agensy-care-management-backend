const express = require("express");
const router = express.Router();
const documentController = require("../controllers/client.document.controller");
const { uploadFile, deleteFile } = require("../helpers/aws.s3");

router.post("/", uploadFile, documentController.document_post);
router.get("/:documentId", documentController.document_get);
router.delete("/:documentId", deleteFile, documentController.document_delete);
router.get("/", documentController.documents_get);

module.exports = router;
