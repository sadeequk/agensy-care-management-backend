const { Checklists , FormsHistory} = require("../models");

exports.getExistingDetails = (clientId, formType) =>
  new Promise(async (resolve, reject) => {
    try {

      const lastUpdate = await FormsHistory.findOne({
        where: { 
          client_id: clientId, 
          form_type: formType
        },
        order: [["created_at", "DESC"]],
      });

      const checklistInfo = await Checklists.findOne({
        where: { client_id: clientId, checklist_type: formType },
        attributes: ["checklist_data"],
      });
      const checklistInfoData = checklistInfo || null;

      const generalDetails = {
        last_update: lastUpdate,
        checklist_info: checklistInfoData,
      };

      resolve(generalDetails);
    } catch (error) {
      console.error("checkListService [getExistingDetails] Error:", error);
      reject(error);
    }
  });

exports.saveOrUpdateDetails = (clientId, primaryUserId, formType, data) =>
  new Promise(async (resolve, reject) => {
    try {
      let checklist = await Checklists.findOne({
        where: { client_id: clientId, checklist_type: formType },
      });
      if (checklist) {
        await checklist.update(data);
      } else {
        checklist = await Checklists.create({
          ...data,
          checklist_type: formType,
          client_id: clientId,
          primary_user_id: primaryUserId,
        });
      }
      resolve(checklist);
    } catch (error) {
      console.error("checkListService [saveOrUpdateDetails] Error:", error);
      reject(error);
    }
  }); 