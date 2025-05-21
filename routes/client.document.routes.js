const express = require("express");
const router = express.Router();
const documentController = require("../controllers/client.document.controller");
const { uploadFile, deleteFile, updateFile, generateDownloadUrl } = require("../middlewares/aws.3.mw");

router.post("/:categoryId", uploadFile, documentController.document_post);
router.get("/:documentId", documentController.document_get);
router.get("/:documentId/download", generateDownloadUrl, documentController.document_download);
router.delete("/:documentId", deleteFile, documentController.document_delete);
router.get("/", documentController.documents_get);

module.exports = router;
