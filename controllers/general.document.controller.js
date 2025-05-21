const documentService = require("../services/general.document.service");
const joiSchemas = require("../validation/general.document.schemas");

exports.document_post = async (req, res) => {
  try {
    if (!req.file) return res.fail("Please upload a file");
    const data = {
      ...req.body,
      uploaded_by: req.user.id,
      s3_bucket: process.env.AWS_S3_BUCKET,
      category_id: null,
      file_size: req.file.size,
      file_type: req.file.mimetype,
      file_url: req.body.file_url,
    };

    const validatedData = await joiSchemas.document_post.validateAsync(data);
    const document = await documentService.createDocument(validatedData);
    return res.success(document);
  } catch (error) {
    console.error("GeneralDocumentController [document_post] Error:", error);
    return res.serverError(error);
  }
};

exports.document_get = async (req, res) => {
  try {
    const { documentId } = req.params;
    const document = await documentService.getDocumentById(documentId);
    if (!document) return res.fail("Document not found");
    return res.success(document);
  } catch (error) {
    console.error("GeneralDocumentController [document_get] Error:", error);
    return res.serverError(error);
  }
};

exports.documents_get = async (req, res) => {
  try {
    const documents = await documentService.getAllDocuments();
    return res.success(documents);
  } catch (error) {
    console.error("GeneralDocumentController [documents_get] Error:", error);
    return res.serverError(error);
  }
};

exports.document_delete = async (req, res) => {
  try {
    const { documentId } = req.params;
    await documentService.deleteDocument(documentId);
    return res.success({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("GeneralDocumentController [document_delete] Error:", error);
    return res.serverError(error);
  }
};
