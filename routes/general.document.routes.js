const express = require("express");
const router = express.Router();
const documentController = require("../controllers/general.document.controller");
const { uploadFile, deleteFile, generateDownloadUrl } = require("../middlewares/aws.3.mw");

router.post("/", uploadFile, documentController.document_post);
router.get("/", documentController.documents_get);
router.get("/:documentId", documentController.document_get);
router.get("/:documentId/download", generateDownloadUrl, documentController.document_download);
router.delete("/:documentId", deleteFile, documentController.document_delete);

module.exports = router;
