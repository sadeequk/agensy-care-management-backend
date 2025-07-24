const {
  Client,
  ComprehensiveCarePlanAssessment,
  InitialCarePlanAssessment,
  FocusedRecommendations,
  FormsHistory,
  CarePlanCategory,
  ClientMedication,
  ClientMedical,
  HealthcareProvider,
} = require('../models');
const { FORM_TYPES, CARE_PLAN_CATEGORIES } = require('../constants');

exports.getExistingDetails = (clientId) =>
  new Promise(async (resolve, reject) => {
    try {
      const lastUpdate = await FormsHistory.findOne({
        where: {
          client_id: clientId,
          form_type: FORM_TYPES.COMPREHENSIVE_CARE_PLAN_ASSESSMENT,
        },
        order: [['created_at', 'DESC']],
      });

      //! Client info
      const clientInfo = await Client.findOne({
        where: { id: clientId },
        attributes: ['id', 'first_name', 'last_name', 'date_of_birth', 'preferred_hospital', 'pharmacy_name'],
      });

      // Focused Recommendations
      const focused_recommendations = await FocusedRecommendations.findAll({
        where: { client_id: clientId },
        attributes: ['id', 'option_number', 'name', 'description', 'details'],
        order: [['option_number', 'ASC']],
      });

      const focusedRecommendationsData = focused_recommendations || [];

      //* Medications
      const medications = await ClientMedication.findAll({
        where: { client_id: clientId },
        attributes: ['id', 'medication_name', 'dosage', 'frequency', 'start_date', 'end_date', 'indication'],
      });

      const medicationsData = medications || [];

      //* Medical Info
      const medical_info = await ClientMedical.findOne({
        where: { client_id: clientId },
        attributes: ['id', 'allergies', 'surgical_history'],
      });

      const medicalData = medical_info || {
        id: null,
        allergies: null,
        surgical_history: null,
      };

      const health_care_providers = await HealthcareProvider.findAll({
        where: { client_id: clientId },
        attributes: ['id', 'provider_name', 'provider_type', 'specialty', 'address', 'phone'],
      });

      const healthCareprovidersData = health_care_providers || [];

      //* Functional ADLS
      const functional_adls = await CarePlanCategory.findOne({
        where: {
          client_id: clientId,
          category_name: CARE_PLAN_CATEGORIES.FUNCTIONAL_ADLS,
        },
        attributes: ['category_name', 'summary', 'deficits_noted', 'detailed_table', 'additional_data'],
      });

      const functionalAdlsData = functional_adls || {
        id: null,
        category_name: CARE_PLAN_CATEGORIES.FUNCTIONAL_ADLS,
        summary: null,
        deficits_noted: null,
        detailed_table: null,
        additional_data: null,
      };

      //* Functional IADLS
      const functional_iadls = await CarePlanCategory.findOne({
        where: {
          client_id: clientId,
          category_name: CARE_PLAN_CATEGORIES.FUNCTIONAL_IADLS,
        },
        attributes: ['category_name', 'summary', 'detailed_table', 'additional_data'],
      });

      const functionalIadlsData = functional_iadls || {
        id: null,
        category_name: CARE_PLAN_CATEGORIES.FUNCTIONAL_IADLS,
        summary: null,
        detailed_table: null,
        additional_data: null,
      };

      //* Home Safety
      const home_safety = await CarePlanCategory.findOne({
        where: {
          client_id: clientId,
          category_name: CARE_PLAN_CATEGORIES.HOME_SAFETY,
        },
        attributes: ['category_name', 'summary', 'deficits_noted', 'detailed_table'],
      });

      const homeSafetyData = home_safety || {
        id: null,
        category_name: CARE_PLAN_CATEGORIES.HOME_SAFETY,
        summary: null,
        deficits_noted: null,
        detailed_table: null,
      };

      //* Memory & Reasoning
      const memory_and_reasoning = await CarePlanCategory.findOne({
        where: {
          client_id: clientId,
          category_name: CARE_PLAN_CATEGORIES.MEMORY_REASONING,
        },
        attributes: ['category_name', 'summary', 'deficits_noted', 'detailed_table'],
      });

      const memoryAndReasoningData = memory_and_reasoning || {
        id: null,
        category_name: CARE_PLAN_CATEGORIES.MEMORY_REASONING,
        summary: null,
        deficits_noted: null,
        detailed_table: null,
      };

      //* Geriatric Depression
      const geriatric_depression = await CarePlanCategory.findOne({
        where: {
          client_id: clientId,
          category_name: CARE_PLAN_CATEGORIES.GERIATRIC_DEPRESSION,
        },
        attributes: ['category_name', 'summary', 'deficits_noted', 'detailed_table'],
      });
      const geriatricDepressionData = geriatric_depression || {
        id: null,
        category_name: CARE_PLAN_CATEGORIES.GERIATRIC_DEPRESSION,
        summary: null,
        deficits_noted: null,
        detailed_table: null,
      };

      //* Nutritional Health
      const nutritional_health = await CarePlanCategory.findOne({
        where: {
          client_id: clientId,
          category_name: CARE_PLAN_CATEGORIES.NUTRITIONAL_HEALTH,
        },
        attributes: ['category_name', 'summary', 'deficits_noted', 'detailed_table'],
      });

      const nutritionalHealthData = nutritional_health || {
        id: null,
        category_name: CARE_PLAN_CATEGORIES.NUTRITIONAL_HEALTH,
        summary: null,
        deficits_noted: null,
        detailed_table: null,
      };

      //* Legal & Financial
      const legal_and_financial = await CarePlanCategory.findOne({
        where: {
          client_id: clientId,
          category_name: CARE_PLAN_CATEGORIES.LEGAL_FINANCIAL,
        },
        attributes: ['category_name', 'summary', 'deficits_noted', 'detailed_table'],
      });
      const legalAndFinancialData = legal_and_financial || {
        id: null,
        category_name: CARE_PLAN_CATEGORIES.LEGAL_FINANCIAL,
        summary: null,
        deficits_noted: null,
        detailed_table: null,
      };

      //* Care Giver Support
      const care_giver_support = await CarePlanCategory.findOne({
        where: {
          client_id: clientId,
          category_name: CARE_PLAN_CATEGORIES.CARE_GIVER_SUPPORT,
        },
        attributes: ['category_name', 'summary', 'deficits_noted', 'detailed_table'],
      });

      const careGiverSupportData = care_giver_support || {
        id: null,
        category_name: CARE_PLAN_CATEGORIES.CARE_GIVER_SUPPORT,
        summary: null,
        deficits_noted: null,
        detailed_table: null,
      };

      // Comprehensive Care Plan Assessment
      const initialAssessment = await InitialCarePlanAssessment.findOne({
        where: { client_id: clientId },
        attributes: [
          'id',
          'date_of_assessment',
          'date_of_care_plan',
          'person_completing_assessment',
          'present_for_assessment',
          'goals_for_assessment',
          'next_step_care_recipient',
          'next_step_care_partner',
        ],
      });

      const initialAssessmentData = initialAssessment || {
        id: null,
        date_of_assessment: null,
        date_of_care_plan: null,
        person_completing_assessment: null,
        present_for_assessment: null,
        goals_for_assessment: null,
        next_step_care_recipient: null,
        next_step_care_partner: null,
      };

      //* Comprehensive Care Plan Assessment
      const comprehensiveAssessment = await ComprehensiveCarePlanAssessment.findOne({
        where: { client_id: clientId },
        attributes: ['id', 'initial_request', 'care_recipient_goals', 'demographic_and_historic_information', 'medical_history'],
      });

      const comprehensiveAssessmentData = comprehensiveAssessment || {
        id: null,
        initial_request: null,
        care_recipient_goals: null,
        demographic_and_historic_information: null,
        medical_history: null,
      };

      const generalDetails = {
        last_update: lastUpdate,
        client_info: clientInfo,
        focused_recommendations: focusedRecommendationsData,
        initial_assessment: initialAssessmentData,
        medications: medicationsData,
        medical_info: medicalData,
        health_care_providers: healthCareprovidersData,
        functional_adls: functionalAdlsData,
        functional_iadls: functionalIadlsData,
        home_safety: homeSafetyData,
        memory_and_reasoning: memoryAndReasoningData,
        geriatric_depression: geriatricDepressionData,
        nutritional_health: nutritionalHealthData,
        legal_and_financial: legalAndFinancialData,
        comprehensive_care_plan_assessment: comprehensiveAssessmentData,
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

      // Client Info
      if (data.client_info) {
        const existingClient = await Client.findOne({
          where: { id: clientId },
        });

        if (existingClient) {
          await existingClient.update(data.client_info);
          result.client_info = existingClient;
        }
      }

      // Focused Recommendations
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

      // Initial Care Plan Assessment
      if (data.initial_assessment) {
        const existingInitialAssessment = await InitialCarePlanAssessment.findOne({
          where: { client_id: clientId },
        });

        if (existingInitialAssessment) {
          await existingInitialAssessment.update(data.initial_assessment);
          result.initial_assessment = existingInitialAssessment;
        } else {
          const newInitialAssessment = await InitialCarePlanAssessment.create({
            ...data.initial_assessment,
            client_id: clientId,
            primary_user_id: primaryUserId,
          });
          result.initial_assessment = newInitialAssessment;
        }
      }

      // Comprehensive Care Plan Assessment
      if (data.comprehensive_care_plan_assessment) {
        const existingAssessment = await ComprehensiveCarePlanAssessment.findOne({
          where: { client_id: clientId },
        });

        if (existingAssessment) {
          await existingAssessment.update(data.comprehensive_care_plan_assessment);
          result.comprehensive_care_plan_assessment = existingAssessment;
        } else {
          const newAssessment = await ComprehensiveCarePlanAssessment.create({
            ...data.comprehensive_care_plan_assessment,
            client_id: clientId,
            primary_user_id: primaryUserId,
          });
          result.comprehensive_care_plan_assessment = newAssessment;
        }
      }

      // Medications
      if (data.medications && Array.isArray(data.medications)) {
        const updatedMedications = [];

        for (const medicationData of data.medications) {
          if (medicationData.id) {
            const existingMedication = await ClientMedication.findOne({
              where: {
                id: medicationData.id,
                client_id: clientId,
              },
            });

            if (existingMedication) {
              await existingMedication.update(medicationData);
              updatedMedications.push(existingMedication);
            }
          } else {
            const newMedication = await ClientMedication.create({
              ...medicationData,
              client_id: clientId,
              primary_user_id: primaryUserId,
            });
            updatedMedications.push(newMedication);
          }
        }

        result.medications = updatedMedications;
      }

      // Medical Info
      if (data.medical_info) {
        const existingMedicalInfo = await ClientMedical.findOne({
          where: { client_id: clientId },
        });

        if (existingMedicalInfo) {
          await existingMedicalInfo.update(data.medical_info);
          result.medical_info = existingMedicalInfo;
        } else {
          const newMedicalInfo = await ClientMedical.create({
            ...data.medical_info,
            client_id: clientId,
            primary_user_id: primaryUserId,
          });
          result.medical_info = newMedicalInfo;
        }
      }

      // Healthcare Providers
      if (data.health_care_providers && Array.isArray(data.health_care_providers)) {
        const updatedProviders = [];

        for (const providerData of data.health_care_providers) {
          if (providerData.id) {
            const existingProvider = await HealthcareProvider.findOne({
              where: {
                id: providerData.id,
                client_id: clientId,
              },
            });

            if (existingProvider) {
              await existingProvider.update(providerData);
              updatedProviders.push(existingProvider);
            }
          } else {
            const newProvider = await HealthcareProvider.create({
              ...providerData,
              client_id: clientId,
              primary_user_id: primaryUserId,
            });
            updatedProviders.push(newProvider);
          }
        }

        result.health_care_providers = updatedProviders;
      }

      // Care Plan Categories (Comprehensive)
      const categories = [
        {
          field: 'functional_adls',
          name: CARE_PLAN_CATEGORIES.FUNCTIONAL_ADLS,
        },
        {
          field: 'functional_iadls',
          name: CARE_PLAN_CATEGORIES.FUNCTIONAL_IADLS,
        },
        { field: 'home_safety', name: CARE_PLAN_CATEGORIES.HOME_SAFETY },
        {
          field: 'memory_and_reasoning',
          name: CARE_PLAN_CATEGORIES.MEMORY_REASONING,
        },
        {
          field: 'geriatric_depression',
          name: CARE_PLAN_CATEGORIES.GERIATRIC_DEPRESSION,
        },
        {
          field: 'nutritional_health',
          name: CARE_PLAN_CATEGORIES.NUTRITIONAL_HEALTH,
        },
        {
          field: 'legal_and_financial',
          name: CARE_PLAN_CATEGORIES.LEGAL_FINANCIAL,
        },
        {
          field: 'care_giver_support',
          name: CARE_PLAN_CATEGORIES.CARE_GIVER_SUPPORT,
        },
      ];

      for (const category of categories) {
        if (data[category.field]) {
          // Use category_name from request if provided, otherwise use the hardcoded one
          const categoryName = data[category.field].category_name || category.name;

          const existing = await CarePlanCategory.findOne({
            where: { client_id: clientId, category_name: categoryName },
          });

          const categoryData = {
            summary: data[category.field].summary,
            deficits_noted: data[category.field].deficits_noted,
            detailed_table: data[category.field].detailed_table,
            additional_data: data[category.field].additional_data,
          };

          if (existing) {
            await existing.update(categoryData);
            result[category.field] = existing;
          } else {
            const newCategory = await CarePlanCategory.create({
              client_id: clientId,
              primary_user_id: primaryUserId,
              category_name: categoryName,
              ...categoryData,
            });
            result[category.field] = newCategory;
          }
        }
      }

      // Resolve with updated details
      const allDetails = await this.getExistingDetails(clientId);
      resolve(allDetails);
    } catch (error) {
      console.error('ComprehensiveCarePlanAssessmentService [saveOrUpdateDetails] Error:', error);
      reject(error);
    }
  });
