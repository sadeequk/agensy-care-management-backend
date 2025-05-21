const { Document, User, DocumentCategory } = require("../models");

exports.createDocument = (documentData) =>
  new Promise(async (resolve, reject) => {
    try {
      const document = await Document.create(documentData);
      const documentWithUser = await Document.findByPk(document.id, {
        include: [
          {
            model: User,
            as: "userInfo",
            attributes: ["id", "first_name", "last_name"],
          },
          {
            model: DocumentCategory,
            as: "category",
            attributes: ["id", "name", "description"],
          },
        ],
      });
      resolve(documentWithUser);
    } catch (error) {
      console.error("GeneralDocumentService [createDocument] Error:", error);
      reject(error);
    }
  });

exports.getDocumentById = (documentId) =>
  new Promise(async (resolve, reject) => {
    try {
      const document = await Document.findOne({
        where: {
          id: documentId,
          client_id: null,
        },
        include: [
          {
            model: User,
            as: "userInfo",
            attributes: ["id", "first_name", "last_name"],
          },
          {
            model: DocumentCategory,
            as: "category",
            attributes: ["id", "name", "description"],
          },
        ],
      });
      resolve(document);
    } catch (error) {
      console.error("GeneralDocumentService [getDocumentById] Error:", error);
      reject(error);
    }
  });

exports.getAllDocuments = () =>
  new Promise(async (resolve, reject) => {
    try {
      const documents = await Document.findAll({
        where: {
          client_id: null,
          active: true,
        },
        include: [
          {
            model: User,
            as: "userInfo",
            attributes: ["id", "first_name", "last_name"],
          },
          {
            model: DocumentCategory,
            as: "category",
            attributes: ["id", "name", "description"],
          },
        ],
        order: [["created_at", "DESC"]],
      });
      resolve(documents);
    } catch (error) {
      console.error("GeneralDocumentService [getAllDocuments] Error:", error);
      reject(error);
    }
  });

exports.deleteDocument = (documentId) =>
  new Promise(async (resolve, reject) => {
    try {
      const document = await Document.findOne({
        where: {
          id: documentId,
          client_id: null,
        },
      });

      if (!document) {
        throw new Error("Document not found");
      }

      await document.destroy();
      resolve(true);
    } catch (error) {
      console.error("GeneralDocumentService [deleteDocument] Error:", error);
      reject(error);
    }
  });
