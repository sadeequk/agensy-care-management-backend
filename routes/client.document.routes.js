const express = require("express");
const router = express.Router();
const documentController = require("../controllers/document.controller");
const { uploadFile, generateSignedUrl } = require("../middlewares/file.upload.mw");

router.post("/:categoryId", uploadFile, generateSignedUrl, documentController.document_post);
router.put("/:documentId", uploadFile, generateSignedUrl, documentController.document_put);
router.delete("/:documentId", documentController.document_delete);
router.get("/", documentController.documents_get);
router.get("/:documentId", generateSignedUrl, documentController.document_get);

module.exports = router;
