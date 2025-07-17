const {
  HealthHistoryForm,
  FormsHistory,
} = require("../models");
const { FORM_TYPES } = require("../constants");

exports.getExistingDetails = (clientId) =>
  new Promise(async (resolve, reject) => {
    try {
      //* Forms History
      const lastUpdate = await FormsHistory.findOne({
        where: { 
          client_id: clientId, 
          form_type: FORM_TYPES.HEALTH_HISTORY 
        },
        // include: [
        //   {
        //     model: User,
        //     as: "user",
        //     attributes: ["id", "first_name", "last_name", "email"],
        //   },
        // ],
        order: [["created_at", "DESC"]],
      });

      //* Health History Form
      const healthHistory = await HealthHistoryForm.findOne({
        where: { client_id: clientId },
        attributes: [
          "id", 
          "date",
          "diagnosis",
          "health_concern_description", 
          "onset_of_symptoms", 
          "frequency_of_symptoms", 
          "severity_of_symptoms",
          "hospitalization",
          "specialty_provider",
          "medication_started",
          "medication_stopped",
          "home_health",
          "what_worked", 
          "notes"
        ],
      });
      
      const healthHistoryData = healthHistory || {
        id: null,
        date: null,
        diagnosis: null,
        health_concern_description: null,
        onset_of_symptoms: null,
        frequency_of_symptoms: null,
        severity_of_symptoms: null,
        hospitalization: null,
        specialty_provider: null,
        medication_started: null,
        medication_stopped: null,
        home_health: null,
        what_worked: null,
        notes: null,
      };

      const generalDetails = {
        last_update: lastUpdate,
        health_history: healthHistoryData,
      };

      resolve(generalDetails);
    } catch (error) {
      console.error("HealthHistoryFormService [getExistingDetails] Error:", error);
      reject(error);
    }
  });

exports.saveOrUpdateDetails = (clientId, data, primaryUserId) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = {};

    
      const existingHealthHistory = await HealthHistoryForm.findOne({
        where: { client_id: clientId },
      });

      if (existingHealthHistory) {
        await existingHealthHistory.update(data);
        result.health_history = existingHealthHistory;
      } else {
        const newHealthHistory = await HealthHistoryForm.create({
          ...data,
          client_id: clientId,
          primary_user_id: primaryUserId,
        });
        result.health_history = newHealthHistory;
      }

   
      const allDetails = await this.getExistingDetails(clientId);
      resolve(allDetails);
    } catch (error) {
      console.error("HealthHistoryFormService [saveOrUpdateDetails] Error:", error);
      reject(error);
    }
  });
