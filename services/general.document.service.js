const { Document, User, Client } = require("../models");
exports.createDocument = (documentData) =>
  new Promise(async (resolve, reject) => {
    try {
      const document = await Document.create(documentData);
      const documentWithUser = await Document.findByPk(document.id, {
        include: [
          {
            model: User,
            as: "uploadedBy",
            attributes: ["id", "first_name", "last_name"],
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
          // client_id: null,
        },
        include: [
          {
            model: User,
            as: "uploadedBy",
            attributes: ["id", "first_name", "last_name"],
          },
        ],
      });
      resolve(document);
    } catch (error) {
      console.error("GeneralDocumentService [getDocumentById] Error:", error);
      reject(error);
    }
  });
exports.getAllDocuments = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const docs = await Document.findAll({
        where: {
          primary_user_id: userId,
        },
        include: [
          {
            model: User,
            as: "uploadedBy",
            attributes: ["id", "first_name", "last_name"],
          },
          {
            model: Client,
            as: "client",
            attributes: ["id", "first_name", "last_name"],
          },
        ],
        order: [["created_at", "DESC"]],
      });

      resolve(docs);
    } catch (error) {
      console.error("GeneralDocumentService [getAllDocuments] Error:", error);
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

exports.getSubUserClientDocuments = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        where: { id: userId },
        include: [
          {
            model: Client,
            through: { attributes: [] },
            attributes: ["id"],
          },
          {
            model: User,
            as: "primaryUser",
            attributes: ["id", "subscription_status"],
          },
        ],
      });

      if (!user || !user.Clients || user.Clients.length === 0) {
        return resolve([]);
      }

      const clientIds = user.Clients.map((client) => client.id);
      const documents = await Document.findAll({
        where: {
          client_id: clientIds,
          active: true,
        },
        include: [
          {
            model: User,
            as: "uploadedBy",
            attributes: ["id", "first_name", "last_name"],
          },
          {
            model: Client,
            as: "client",
            attributes: ["id", "first_name", "last_name"],
          },
          {
            model: User,
            as: "primaryUser",
            attributes: ["id", "subscription_status"],
            where: { id: user.primaryUser.id },
          },
        ],
        order: [["created_at", "DESC"]],
      });

      resolve(documents);
    } catch (error) {
      console.error("GeneralDocumentService [getSubUserClientDocuments] Error:", error);
      reject(error);
    }
  });
