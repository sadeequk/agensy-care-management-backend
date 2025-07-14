const { StartOfCareChecklist } = require("../models");

exports.getExistingDetails = (clientId) =>
  new Promise(async (resolve, reject) => {
    try {
      const checklistInfo = await StartOfCareChecklist.findOne({
        where: { client_id: clientId },
        attributes: ["id", "roi", "advance_directive", "ltc_authorization_form", "code_status_notes", "appointments_on_calendar", "recap_email_notes"],
      });
      const checklistInfoData = checklistInfo || {
        id: null,
        roi: null,
        advance_directive: null,
        ltc_authorization_form: null,
        code_status_notes: null,
        appointments_on_calendar: null,
        recap_email_notes: null,
      };
      resolve(checklistInfoData);
    } catch (error) {
      console.error("StartOfCareChecklistService [getExistingDetails] Error:", error);
      reject(error);
    }
  });

exports.saveOrUpdateDetails = (clientId, primaryUserId, data) =>
  new Promise(async (resolve, reject) => {
    try {
      let checklist = await StartOfCareChecklist.findOne({
        where: { client_id: clientId },
      });
      if (checklist) {
        await checklist.update(data);
      } else {
        checklist = await StartOfCareChecklist.create({
          ...data,
          client_id: clientId,
          primary_user_id: primaryUserId,
        });
      }
      resolve(checklist);
    } catch (error) {
      console.error("StartOfCareChecklistService [saveOrUpdateDetails] Error:", error);
      reject(error);
    }
  }); 