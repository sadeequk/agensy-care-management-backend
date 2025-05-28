const generalDocumentService = require("../services/general.document.service");
const joiSchemas = require("../validation/general.document.schemas");
const { generatePresignedUrl, deleteFile } = require("../helpers/aws.s3");

exports.document_post = async (req, res) => {
  try {
    if (!req.file) return res.fail("Please upload a file");
    const data = {
      ...req.body,
      client_id: null,
      uploaded_by: req.user.id,
      primary_user_id: req.user.id, //! Will be changed in future
      category: req.body.category,
      file_size: req.file.size,
      file_type: req.file.mimetype,
      file_name: req.uploadedFile.fileName,
    };

    const validatedData = await joiSchemas.document_post.validateAsync(data);
    const document = await generalDocumentService.createDocument(validatedData);

    // Generate presigned URL
    const presignedUrl = await generatePresignedUrl(document.file_name);

    const response = document.toJSON();

    return res.success({
      ...response,
      file_url: presignedUrl,
    });
  } catch (error) {
    console.error("GeneralDocumentController [document_post] Error:", error);
    return res.serverError(error);
  }
};

exports.document_get = async (req, res) => {
  try {
    const { documentId } = req.params;
    const document = await generalDocumentService.getDocumentById(documentId);
    if (!document) return res.fail("Document not found");

    // Generate a new pre-signed URL using filename
    const presignedUrl = await generatePresignedUrl(document.file_name);

    const response = document.toJSON();
    delete response.file_name;

    return res.success({
      ...response,
      file_url: presignedUrl,
    });
  } catch (error) {
    console.error("DocumentController [document_get] Error:", error);
    return res.serverError(error);
  }
};

exports.documents_get = async (req, res) => {
  try {
    // const documents = await generalDocumentService.getAllDocuments();
    const documents = await generalDocumentService.getAllDocuments(req.user.id);
    return res.success(documents);
  } catch (error) {
    console.error("GeneralDocumentController [documents_get] Error:", error);
    return res.serverError(error);
  }
};

exports.document_delete = async (req, res) => {
  try {
    const { documentId } = req.params;

    // First delete the file from S3
    await deleteFile(req, res, async () => {
      await generalDocumentService.deleteDocument(documentId);
      return res.success({ message: "Document deleted successfully" });
    });
  } catch (error) {
    console.error("DocumentController [document_delete] Error:", error);
    return res.serverError(error);
  }
};
