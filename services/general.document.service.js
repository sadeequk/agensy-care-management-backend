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
          client_id: null,
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

// exports.getAllDocuments = () =>
//   new Promise(async (resolve, reject) => {
//     try {
//       const documents = await Document.findAll({
//         where: {
//           client_id: null,
//           active: true,
//         },
//         include: [
//           {
//             model: User,
//             as: "uploadedBy",
//             attributes: ["id", "first_name", "last_name"],
//           },
//         ],
//         order: [["created_at", "DESC"]],
//       });
//       resolve(documents);
//     } catch (error) {
//       console.error("GeneralDocumentService [getAllDocuments] Error:", error);
//       reject(error);
//     }
//   });

//^ may be change in future if user related to primary user have access for this
exports.getAllDocuments = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const generalDocuments = await Document.findAll({
        where: {
          client_id: null,
        },
        include: [
          {
            model: User,
            as: "uploadedBy",
            attributes: ["id", "first_name", "last_name"],
          },
        ],
        order: [["created_at", "DESC"]],
      });

      const userDocuments = await Document.findAll({
        where: {
          client_id: {
            [Op.ne]: null,
          },
          active: true,
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

      const allDocuments = [...generalDocuments, ...userDocuments];
      resolve(allDocuments);
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
