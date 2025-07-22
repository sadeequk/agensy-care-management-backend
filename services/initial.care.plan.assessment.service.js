const {
  Client,
  InitialCarePlanAssessment,
  FocusedRecommendations,
  FormsHistory,
  CarePlanCategory,
} = require("../models");
const { FORM_TYPES , CARE_PLAN_CATEGORIES} = require("../constants");

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
        next_step_care_recipient: null,
        next_step_care_partner: null,
      };


      //* Functional ADLS
      const functional_adls = await CarePlanCategory.findOne({
        where: { client_id: clientId, category_name: CARE_PLAN_CATEGORIES.FUNCTIONAL_ADLS },
        attributes: [ "category_name","summary"],
      });

      const functional_adls_data = functional_adls || {
        id: null,
        category_name: CARE_PLAN_CATEGORIES.FUNCTIONAL_ADLS,
        summary: null,
      };

      //* Functional IADLS
      const functional_iadls= await CarePlanCategory.findOne({
        where: { client_id: clientId, category_name: CARE_PLAN_CATEGORIES.FUNCTIONAL_IADLS },
        attributes: [ "category_name","summary"],    
      });
      const functional_iadls_data = functional_iadls || {
        id: null,
        category_name: CARE_PLAN_CATEGORIES.FUNCTIONAL_IADLS,
        summary: null,
      };

      //* Home Safety       
      const home_safety = await CarePlanCategory.findOne({
        where: { client_id: clientId, category_name: CARE_PLAN_CATEGORIES.HOME_SAFETY },
        attributes: [ "category_name","summary"],
      });

      const home_safety_data = home_safety || { 
        id: null,
        category_name: CARE_PLAN_CATEGORIES.HOME_SAFETY,
        summary: null,
      };

      //* Memory & Reasoning
      const memory_and_recommendations = await CarePlanCategory.findOne({
        where: { client_id: clientId, category_name: CARE_PLAN_CATEGORIES.MEMORY_REASONING },
        attributes: ["category_name","summary"],
      });
      const memory_and_recommendations_data = memory_and_recommendations || {
        id: null,
        category_name: CARE_PLAN_CATEGORIES.MEMORY_REASONING,
        summary: null,
      };

      //* Geriatric Depression
      const geriatric_depression = await CarePlanCategory.findOne({
        where: { client_id: clientId, category_name: CARE_PLAN_CATEGORIES.GERIATRIC_DEPRESSION },
        attributes: [ "category_name","summary"],
      });
      const geriatric_depression_data = geriatric_depression || {
        id: null,
        category_name: CARE_PLAN_CATEGORIES.GERIATRIC_DEPRESSION,
        summary: null,
      };

      //* Nutritional Health
      const nutritional_health = await CarePlanCategory.findOne({
        where: { client_id: clientId, category_name: CARE_PLAN_CATEGORIES.NUTRITIONAL_HEALTH },
        attributes: ["category_name","summary"],
      });
      const nutritional_health_data = nutritional_health || {
        id: null,
        category_name: CARE_PLAN_CATEGORIES.NUTRITIONAL_HEALTH,
        summary: null,
      };

      //* Legal & Financial
      const legal_and_financial = await CarePlanCategory.findOne({
        where: { client_id: clientId, category_name: CARE_PLAN_CATEGORIES.LEGAL_FINANCIAL },
        attributes: ["category_name","summary"],
      });
      const legal_and_financial_data = legal_and_financial || {
        id: null,
        category_name: CARE_PLAN_CATEGORIES.LEGAL_FINANCIAL,
        summary: null,
      };

      //* Care Giver Support
      const care_giver_support = await CarePlanCategory.findOne({
        where: { client_id: clientId, category_name: CARE_PLAN_CATEGORIES.CARE_GIVER_SUPPORT },
        attributes: [ "category_name","summary"],
      });
      
      const care_giver_support_data = care_giver_support || {
        id: null,
        category_name: CARE_PLAN_CATEGORIES.CARE_GIVER_SUPPORT,
        summary: null,
      };

      const generalDetails = {
        last_update: lastUpdate,
        client_info: clientInfoData,
        focused_recommendations: focusedRecommendationsData,
        functional_adls: functional_adls_data,
        functional_iadls: functional_iadls_data,
        home_safety: home_safety_data,
        memory_and_recommendations: memory_and_recommendations_data,
        geriatric_depression: geriatric_depression_data,
        nutritional_health: nutritional_health_data,
        legal_and_financial: legal_and_financial_data,
        care_giver_support: care_giver_support_data,
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


      //* Care Plan Categories
      const categories = [
        { field: 'functional_adls', name: CARE_PLAN_CATEGORIES.FUNCTIONAL_ADLS },
        { field: 'functional_iadls', name: CARE_PLAN_CATEGORIES.FUNCTIONAL_IADLS },
        { field: 'home_safety', name: CARE_PLAN_CATEGORIES.HOME_SAFETY },
        { field: 'memory_and_recommendations', name: CARE_PLAN_CATEGORIES.MEMORY_REASONING },
        { field: 'geriatric_depression', name: CARE_PLAN_CATEGORIES.GERIATRIC_DEPRESSION },
        { field: 'nutritional_health', name: CARE_PLAN_CATEGORIES.NUTRITIONAL_HEALTH },
        { field: 'legal_and_financial', name: CARE_PLAN_CATEGORIES.LEGAL_FINANCIAL },
        { field: 'care_giver_support', name: CARE_PLAN_CATEGORIES.CARE_GIVER_SUPPORT }
      ];

        for (const category of categories) {
        if (data[category.field]) {
          const existing = await CarePlanCategory.findOne({
            where: { client_id: clientId, category_name: category.name }
          });
          
          if (existing) {
            await existing.update({ summary: data[category.field].summary });
            result[category.field] = existing;
          } else {
            const newCategory = await CarePlanCategory.create({
              client_id: clientId,
              primary_user_id: primaryUserId,
              category_name: category.name,
              summary: data[category.field].summary,
            });
            result[category.field] = newCategory;
          }
        }
      }

      //* Resolve with updated details
      const allDetails = await this.getExistingDetails(clientId);
      resolve(allDetails);
    } catch (error) {
      console.error("InitialCarePlanAssessmentService [saveOrUpdateDetails] Error:", error);
      reject(error);
    }
  }); 