const { EssentialDocument, FormsHistory } = require("../models");
const { FORM_TYPES } = require("../constants");

exports.getExistingDetails = (clientId) =>
  new Promise(async (resolve, reject) => {
    try {
      const lastUpdate = await FormsHistory.findOne({
        where: { 
          client_id: clientId, 
          form_type: FORM_TYPES.ESSENTIAL_DOCUMENT
        },
        order: [["created_at", "DESC"]],
      });

      const essentialDocuments = await EssentialDocument.findAll({
        where: { client_id: clientId }
      });

      const essentialDocumentsData = essentialDocuments || []

      const generalDetails = {
        last_update: lastUpdate,
        essential_documents: essentialDocumentsData,
      };
      resolve(generalDetails);
    } catch (error) {
      console.error("essentialDocumentService [getExistingDetails] Error:", error);
      reject(error);
    }
  });

exports.saveOrUpdateDetails = (clientId, primaryUserId, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = {};

      if (data.essential_documents && Array.isArray(data.essential_documents)) {
        const updatedDocuments = [];

        for (const docData of data.essential_documents) {
          if (docData.id) {
            const existingDoc = await EssentialDocument.findOne({
              where: {
                id: docData.id,
                client_id: clientId,
              },
            });

            if (existingDoc) {
              await existingDoc.update(docData);
              updatedDocuments.push(existingDoc);
            }
          } else {
            const newDoc = await EssentialDocument.create({
              ...docData,
              client_id: clientId,
              primary_user_id: primaryUserId,
            });
            updatedDocuments.push(newDoc);
          }
        }

        result.essential_documents = updatedDocuments;
      }

      resolve(result);
    } catch (error) {
      console.error("essentialDocumentService [saveOrUpdateDetails] Error:", error);
      reject(error);
    }
  });
