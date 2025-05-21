const express = require("express");
const router = express.Router();
const documentController = require("../controllers/document.controller");
const { uploadFile, deleteFile, updateFile } = require("../middlewares/aws.3.mw");

router.post("/:categoryId", uploadFile, documentController.document_post);
router.get("/:documentId", documentController.document_get);
router.delete("/:documentId", deleteFile, documentController.document_delete);
router.get("/", documentController.documents_get);

module.exports = router;
