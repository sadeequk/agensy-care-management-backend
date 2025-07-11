const { FormsHistory } = require("../models");


exports.recordFormUpdate = (clientId, userId, primaryUserId, formType) =>
  new Promise(async (resolve, reject) => {
    try {
      const updateRecord = await FormsHistory.create({
        client_id: clientId,
        user_id: userId,
        primary_user_id: primaryUserId,
        form_type: formType,
      });

      resolve(updateRecord);
    } catch (error) {
      console.error("FormHistoryService [recordFormUpdate] Error:", error);
      reject(error);
    }
  });
