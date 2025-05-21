const express = require("express");
const router = express.Router();
const documentController = require("../controllers/general.document.controller");
const { uploadFile, deleteFile } = require("../helpers/aws.3");

router.post("/", uploadFile, documentController.document_post);
router.get("/", documentController.documents_get);
router.get("/:documentId", documentController.document_get);
router.delete("/:documentId", deleteFile, documentController.document_delete);

module.exports = router;
