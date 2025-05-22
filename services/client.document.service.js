const { Document, User } = require("../models");

exports.createDocument = (documentData) =>
  new Promise(async (resolve, reject) => {
    try {
      const document = await Document.create(documentData);
      //  resolve(document);

      const documentWithUser = await Document.findByPk(document.id, {
        include: [
          {
            model: User,
            as: "userInfo",
            attributes: ["id", "first_name", "last_name"],
          },
        ],
      });
      resolve(documentWithUser);
    } catch (error) {
      console.error("DocumentService [createDocument] Error:", error);
      reject(error);
    }
  });

exports.deleteDocument = (documentId) =>
  new Promise(async (resolve, reject) => {
    try {
      const document = await Document.findByPk(documentId);

      await document.destroy();
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

      const documents = await Document.findAll({
        where: whereClause,
        include: [
          {
            model: User,
            as: "userInfo",
            attributes: ["id", "first_name", "last_name"],
          },
        ],
        order: [["created_at", "DESC"]],
      });
      resolve(documents);
    } catch (error) {
      console.error("DocumentService [getAllDocuments] Error:", error);
      reject(error);
    }
  });

exports.getDocumentById = (documentId) =>
  new Promise(async (resolve, reject) => {
    try {
      const document = await Document.findByPk(documentId, {
        include: [
          {
            model: User,
            as: "userInfo",
            attributes: ["id", "first_name", "last_name"],
          },
        ],
      });
      resolve(document);
    } catch (error) {
      console.error("DocumentService [getDocumentById] Error:", error);
      reject(error);
    }
  });
