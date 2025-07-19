const {
  CaregiverInformationSheet,
  FormsHistory,
  User,
} = require("../models");
const { FORM_TYPES } = require("../constants");

exports.getExistingDetails = (clientId) =>
  new Promise(async (resolve, reject) => {
    try {
      const lastUpdate = await FormsHistory.findOne({
        where: { 
          client_id: clientId, 
          form_type: FORM_TYPES.CAREGIVER_INFORMATION_SHEET 
        },

        order: [["created_at", "DESC"]],
      });

      const existingForm = await CaregiverInformationSheet.findOne({
        where: { client_id: clientId },
        order: [["created_at", "DESC"]],
      });

      resolve({
        last_update: lastUpdate,
        form_data: existingForm || null,
      });
    } catch (error) {
      reject(error);
    }
  });

exports.saveOrUpdateDetails = (clientId, primaryUserId, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const existingForm = await CaregiverInformationSheet.findOne({
        where: { client_id: clientId },
      });

      let formRecord;
      if (existingForm) {
        formRecord = await existingForm.update({
          ...data,
        });
      } else {
        formRecord = await CaregiverInformationSheet.create({
          ...data,
          client_id: clientId,
          primary_user_id: primaryUserId,
        });
      }

      resolve(formRecord);
    } catch (error) {
      reject(error);
    }
  }); 