const {
  Client,
  InitialCarePlanAssessment,
  FocusedRecommendations,
  FormsHistory,
} = require("../models");
const { FORM_TYPES } = require("../constants");

exports.getExistingDetails = (clientId) =>
  new Promise(async (resolve, reject) => {
    try {
      const lastUpdate = await FormsHistory.findOne({
        where: { 
          client_id: clientId, 
          form_type: FORM_TYPES.INITIAL_CARE_PLAN_ASSESSMENT 
        },
        order: [["created_at", "DESC"]],
      });

      //client info
    const clientInfo = await Client.findOne({
        where: { id: clientId },
        attributes: ["id", "first_name", "last_name", "date_of_birth"],
      });
      const clientInfoData = clientInfo || {
        id: null,
        first_name: null,
        last_name: null,
        date_of_birth: null,
      };

        //* Focused Recommendations
    const focusedRecommendations = await FocusedRecommendations.findAll({
        where: { 
         client_id: clientId,
        },
        attributes: ["id", "option_number", "name", "description", "details"],
        order: [["option_number", "ASC"]],
        });

    const focusedRecommendationsData = focusedRecommendations || [];


      //* Initial Care Plan Assessment
      const initialCarePlanAssessment = await InitialCarePlanAssessment.findOne({
        where: { client_id: clientId },
        attributes: [
          "id", "date_of_assessment", "date_of_care_plan",
          "person_completing_assessment", "present_for_assessment", "goals_for_assessment",
          "functional_adls", "functional_iadls", "home_safety", "memory_and_recommendations",
          "geriatric_depression", "nutritional_health", "legal_and_financial", "care_giver_support",
          "next_step_care_recipient", "next_step_care_partner"
        ],
      });

    

      const initialCarePlanAssessmentData = initialCarePlanAssessment || {
        id: null,
        date_of_assessment: null,
        date_of_care_plan: null,
        person_completing_assessment: null,
        present_for_assessment: null,
        goals_for_assessment: null,
        functional_adls: null,
        functional_iadls: null,
        home_safety: null,
        memory_and_recommendations: null,
        geriatric_depression: null,
        nutritional_health: null,
        legal_and_financial: null,
        care_giver_support: null,
        next_step_care_recipient: null,
        next_step_care_partner: null,
      };

      const generalDetails = {
        last_update: lastUpdate,
        client_info: clientInfoData,
        focused_recommendations: focusedRecommendationsData,
        initial_care_plan_assessment: initialCarePlanAssessmentData,
      };

      resolve(generalDetails);
    } catch (error) {
      reject(error);
    }
  });

exports.saveOrUpdateDetails = (clientId, data, primaryUserId) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = {};

      //* Initial Care Plan Assessment
      if (data.initial_care_plan_assessment) {
        const existingAssessment = await InitialCarePlanAssessment.findOne({
          where: { client_id: clientId },
        });

        if (existingAssessment) {
          await existingAssessment.update(data.initial_care_plan_assessment);
          result.initial_care_plan_assessment = existingAssessment;
        } else {
          const newAssessment = await InitialCarePlanAssessment.create({
            ...data.initial_care_plan_assessment,
            client_id: clientId,
            primary_user_id: primaryUserId,
          });
          result.initial_care_plan_assessment = newAssessment;
        }
      }

      //* Focused Recommendations
      if (data.focused_recommendations && Array.isArray(data.focused_recommendations)) {
        const updatedRecommendations = [];

        for (const recommendationData of data.focused_recommendations) {
          if (recommendationData.id) {
            const existingRecommendation = await FocusedRecommendations.findOne({
              where: {
                id: recommendationData.id,
                client_id: clientId,
              },
            });

            if (existingRecommendation) {
              await existingRecommendation.update(recommendationData);
              updatedRecommendations.push(existingRecommendation);
            }
          } else {
            const newRecommendation = await FocusedRecommendations.create({
              ...recommendationData,
              client_id: clientId,
              primary_user_id: primaryUserId,
            });
            updatedRecommendations.push(newRecommendation);
          }
        }

        result.focused_recommendations = updatedRecommendations;
      }

      //* Resolve with updated details
      const allDetails = await this.getExistingDetails(clientId);
      resolve(allDetails);
    } catch (error) {
      console.error("InitialCarePlanAssessmentService [saveOrUpdateDetails] Error:", error);
      reject(error);
    }
  }); 