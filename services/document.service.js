const { Document } = require("../models");

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
