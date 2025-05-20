const documentService = require("../services/document.service");
const joiSchemas = require("../validation/document.schemas");

exports.document_post = async (req, res) => {
  try {
    const data = {
      ...req.body,
      client_id: req.params.clientId,
      uploaded_by: req.user.id,
      s3_bucket: process.env.AWS_S3_BUCKET,
      s3_key: req.file ? req.file.key : null,
      file_size: req.file ? req.file.size : null,
      file_type: req.file ? req.file.mimetype : null,
      file_url: req.body.file_url,
    };

    const validatedData = await joiSchemas.document_post.validateAsync(data);
    const document = await documentService.createDocument(validatedData);
    return res.success(document);
  } catch (error) {
    console.error("DocumentController [document_post] Error:", error);
    return res.serverError(error);
  }
};

exports.document_put = async (req, res) => {
  try {
    const { documentId } = req.params;
    const data = {
      ...req.body,
      s3_bucket: req.file ? process.env.AWS_S3_BUCKET : req.body.s3_bucket,
      s3_key: req.file ? req.file.key : req.body.s3_key,
      file_size: req.file ? req.file.size : req.body.file_size,
      file_type: req.file ? req.file.mimetype : req.body.file_type,
      file_url: req.body.file_url,
    };

    const validatedData = await joiSchemas.document_put.validateAsync(data);
    const document = await documentService.updateDocument(documentId, validatedData);
    return res.success(document);
  } catch (error) {
    console.error("DocumentController [document_put] Error:", error);
    return res.serverError(error);
  }
};

exports.document_delete = async (req, res) => {
  try {
    const { documentId } = req.params;
    await documentService.deleteDocument(documentId);
    return res.success({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("DocumentController [document_delete] Error:", error);
    return res.serverError(error);
  }
};

exports.documents_get = async (req, res) => {
  try {
    const documents = await documentService.getAllDocuments();
    return res.success(documents);
  } catch (error) {
    console.error("DocumentController [documents_get] Error:", error);
    return res.serverError(error);
  }
};

exports.document_get = async (req, res) => {
  try {
    const { documentId } = req.params;
    const document = await documentService.getDocumentById(documentId);
    return res.success(document);
  } catch (error) {
    console.error("DocumentController [document_get] Error:", error);
    return res.serverError(error);
  }
};
