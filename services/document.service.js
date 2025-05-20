const { Document } = require("../models");
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

exports.createDocument = (documentData) =>
  new Promise(async (resolve, reject) => {
    try {
      const document = await Document.create(documentData);
      resolve(document);
    } catch (error) {
      console.error("DocumentService [createDocument] Error:", error);
      reject(error);
    }
  });

exports.updateDocument = (documentId, documentData) =>
  new Promise(async (resolve, reject) => {
    try {
      const document = await Document.findByPk(documentId);
      await document.update(documentData);
      resolve(document);
    } catch (error) {
      console.error("DocumentService [updateDocument] Error:", error);
      reject(error);
    }
  });

exports.deleteDocument = (documentId) =>
  new Promise(async (resolve, reject) => {
    try {
      const document = await Document.findByPk(documentId);
      if (!document) {
        throw new Error("Document not found");
      }

      // Delete from S3 if file_url exists
      if (document.file_url) {
        try {
          const fileUrl = document.file_url;
          const key = fileUrl.split(".com/")[1];

          const deleteCommand = new DeleteObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: key,
          });

          await s3.send(deleteCommand);
          console.log("Successfully deleted file from S3:", key);
        } catch (s3Error) {
          console.error("Error deleting file from S3:", s3Error);
          // Continue with database deletion even if S3 deletion fails
        }
      }

      // Delete from database
      await document.destroy();
      console.log("Successfully deleted document from database");
      resolve(true);
    } catch (error) {
      console.error("DocumentService [deleteDocument] Error:", error);
      reject(error);
    }
  });

exports.getAllDocuments = (clientId) =>
  new Promise(async (resolve, reject) => {
    try {
      const whereClause = { active: true };
      if (clientId) {
        whereClause.client_id = clientId;
      }
      const documents = await Document.findAll({ where: whereClause });
      resolve(documents);
    } catch (error) {
      console.error("DocumentService [getAllDocuments] Error:", error);
      reject(error);
    }
  });

exports.getDocumentById = (documentId) =>
  new Promise(async (resolve, reject) => {
    try {
      const document = await Document.findByPk(documentId);
      resolve(document);
    } catch (error) {
      console.error("DocumentService [getDocumentById] Error:", error);
      reject(error);
    }
  });
