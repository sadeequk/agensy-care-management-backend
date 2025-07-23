const {
  CareRecipientQuestionnaire,
  Client,
  HealthcareProvider,
  ClientInsurance,
  FormsHistory,
  ClientRelatives,
  ClientFriendContact,
  ClientProfessionalContact,
  ClientMedicationCondition,
  ClientMedical,
  User,
} = require("../models");
const { FORM_TYPES } = require("../constants");

exports.getExistingDetails = (clientId, userId) =>
  new Promise(async (resolve, reject) => {
    try {

      const user = await User.findOne({
        where: {
          id: userId,
        },
        attributes: ["id", "first_name", "last_name", "relation"],
      });
      //* Forms History
      const lastUpdate = await FormsHistory.findOne({
        where: { 
          client_id: clientId, 
          form_type: FORM_TYPES.CARE_RECIPIENT_QUESTIONNAIRE 
        },
        order: [["created_at", "DESC"]],
      });

      //* Client Info
      const clientInfo = await Client.findByPk(clientId, {
        attributes: [
          "first_name",
          "last_name",
          "address",
          "city",
          "state",
          "zip",
          "ssn",
          "date_of_birth",
          "birth_place",
          "phone",
          "email",  
          "cultural_background",
          "education",
          "preferred_hospital",
          "religion",
          "active_religion_location",
          "marital_status",
          "date_of_divorce_or_widowhood",
          "loss_impact_description",
          "dnr",
          "trust",
          "lifecare",
          "will",
          "living_will",
          "funeral_arrangements",
          "cemetery_plot",
          "monthly_income",
          "spouse_income",
          "savings",
          "other_assets",
          "financial_problems_description",
        ],
      });
    //   * Insurance
      const insurance = await ClientInsurance.findOne({
        where: { client_id: clientId },
        attributes: [
             "medicare_a", 
             "medicare_b", 
             "medicare_numbers",
             "supplement_plan",
             "provider",
             "policy_number",
             "phone",
             "mental_health_coverage",
             "hmo",
             "hmo_policy_number",
             "hmo_phone",
             "long_term_care_insurance_name",
             "long_term_care_insurance_policy_number",
             "long_term_care_insurance_phone",
            ]
      });

      const insuranceData = insurance || {
        medicare_a: null,
        medicare_b: null,
        medicare_numbers: null,
        supplement_plan: null,
        provider: null,
        policy_number: null,
        phone: null,
        mental_health_coverage: null,
        hmo: null,
        hmo_policy_number: null,
        hmo_phone: null,
        long_term_care_insurance_name: null,
        long_term_care_insurance_policy_number: null,
        long_term_care_insurance_phone: null,
      };

      //* Relative
      const relatives= await ClientRelatives.findAll({
        where: { client_id: clientId },
        attributes: ["id", "name", "address", "home_phone", "work_phone", "relationship", "email"],
      });

      const relativeData = relatives|| [];

      //* Friend Contact
      const friendContact = await ClientFriendContact.findAll({
        where: { client_id: clientId },
        attributes: ["id", "name", "address", "relationship", "phone", "help_description"],
      });

      const friendContactData = friendContact || [];

      
      //* Professional Contacts
      const professionalContacts = await ClientProfessionalContact.findAll({
        where: { client_id: clientId },
        attributes: ["id", "role", "name", "phone"],
      });
      const professionalContactsData = professionalContacts || [];


      //* Healthcare Providers
      const healthcareProviders = await HealthcareProvider.findAll({
        where: {
          client_id: clientId,
          specialty_provider: false,
        },
        attributes: [
          "id",
          "provider_name",
          "phone",    
          "for_what_problem",
        ],
        order: [["created_at", "ASC"]],
      });

      const healthcareProvidersData = healthcareProviders || [];

      //* Medical Conditions
      const medicalConditions = await ClientMedicationCondition.findOne({
        where: { client_id: clientId },
        attributes: ["id", "problem", "treatment", "medications"],
        order: [["created_at", "ASC"]],
      });

      const medicalConditionsData = medicalConditions || [];

      //* Care Recipient Questionnaire
      const questionnaire = await CareRecipientQuestionnaire.findOne({
        where: { client_id: clientId },
        attributes: [
          "id",
          "support_system_rating",
          "support_system_problems",
          "emergency_contacts",
          "house_cleaning_agency",
          "house_cleaning_satisfaction",
          "house_cleaning_frequency",
          "home_aid_agency",
          "home_aid_satisfaction",
          "home_aid_frequency",
          "home_health_agency",
          "home_health_satisfaction",
          "home_health_frequency",
          "maintenance_agency",
          "maintenance_satisfaction",
          "maintenance_frequency",
          "other_help_agency",
          "other_help_satisfaction",
          "other_help_frequency",
          "living_environment_type",
          "home_environment_adequacy",
          "problem_areas_daily_living",
          "problem_areas_explanation",
          "problems_risks",
          "nutrition_concerns",
          "self_care_capacity_summary",
          "memory_problems",
          "emotional_health_notes",
          "personality_coping",
          "recent_behavior_changes",
          "recipient_shares_concerns",
          "recipient_shares_concerns_notes",
          "emotional_problems_history",
          "emotional_problems_treatment",
          "emotional_problems_notes",
          "recent_losses_impact",
          "social_life_notes",
          "occupation_profession",
          "retirement_date",
          "retirement_adjustment",
          "major_concerns",
          "areas_accepting_help",
        ],
      });

      const questionnaireData = questionnaire || {
       id: null,
       support_system_rating: null,
       support_system_problems: null,
       emergency_contacts: null,
       house_cleaning_agency: null,
       house_cleaning_satisfaction: null,
       house_cleaning_frequency: null, 
       home_aid_agency: null,
       home_aid_satisfaction: null,
       home_aid_frequency: null,
       home_health_agency: null,
       home_health_satisfaction: null,
       home_health_frequency: null,
       maintenance_agency: null,
       maintenance_satisfaction: null,
       maintenance_frequency: null,
       other_help_agency: null,
       other_help_satisfaction: null,
       other_help_frequency: null,
       living_environment_type: null,
       home_environment_adequacy: null,
       problem_areas_daily_living: null,
       problem_areas_explanation: null,
       problems_risks: null,
       nutrition_concerns: null,
       self_care_capacity_summary: null,
       memory_problems: null,
       emotional_health_notes: null,
       personality_coping: null,
       recent_behavior_changes: null,
       recipient_shares_concerns: null,
       recipient_shares_concerns_notes: null,
       emotional_problems_history: null,
       emotional_problems_treatment: null,
       emotional_problems_notes: null,
       recent_losses_impact: null,
       social_life_notes: null,
       occupation_profession: null,
       retirement_date: null,
       retirement_adjustment: null,
       major_concerns: null,
       areas_accepting_help: null,
      };


    const medicalInfo = await ClientMedical.findOne({
      where: { client_id: clientId },
      attributes: ["id", "last_checkup_date","allergies","recent_hospitalization","hospital_details","support_system_thoughts"],
    });

      const medicalInfoData = medicalInfo || {
        id: null,
        last_checkup_date: null,
        allergies: null,
        recent_hospitalization: null,
        hospital_details: null,
        support_system_thoughts: null,
      };


      const generalDetails = {
        user: user,
        last_update: lastUpdate,
        client_info: clientInfo,
        insurance: insuranceData,
        relatives: relativeData,
        friends_contact: friendContactData,
        professional_contacts: professionalContactsData,
        medical_conditions: medicalConditionsData,
        healthcare_providers: healthcareProvidersData,
        medical_info: medicalInfoData,
        questionnaire: questionnaireData,
      };

      resolve(generalDetails);
    } catch (error) {
      console.error("CareRecipientQuestionnaireService [getExistingDetails] Error:", error);
      reject(error);
    }
  });

exports.saveOrUpdateDetails = (clientId, primaryUserId, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = {};

      //* Client Information
      if (data.client_info) {
        const clientRecord = await Client.findByPk(clientId);
        if (clientRecord) {
          await clientRecord.update(data.client_info);
          result.client_info = clientRecord;
        }
      }

      //* Insurance Information
      if (data.insurance) {
        const existingInsurance = await ClientInsurance.findOne({
          where: { client_id: clientId },
        });

        if (existingInsurance) {
          await existingInsurance.update(data.insurance);
          result.insurance = existingInsurance;
        } else {
          const newInsurance = await ClientInsurance.create({
            ...data.insurance,
            client_id: clientId,
          });
          result.insurance = newInsurance;
        }
      }

      //* Relatives
      if (data.relatives && Array.isArray(data.relatives)) {
        const updatedRelatives = [];

        for (const relativeData of data.relatives) {
          if (relativeData.id) {
            const existingRelative = await ClientRelatives.findOne({
              where: {
                id: relativeData.id,
                client_id: clientId,
              },
            });

            if (existingRelative) {
              await existingRelative.update(relativeData);
              updatedRelatives.push(existingRelative);
            }
          } else {
            const newRelative = await ClientRelatives.create({
              ...relativeData,
              client_id: clientId,
            });
            updatedRelatives.push(newRelative);
          }
        }

        result.relatives = updatedRelatives;
      }

      //* Friend Contacts
      if (data.friends_contact && Array.isArray(data.friends_contact)) {
        const updatedFriendContacts = [];

        for (const friendData of data.friends_contact) {
          if (friendData.id) {
            const existingFriend = await ClientFriendContact.findOne({
              where: {
                id: friendData.id,
                client_id: clientId,
              },
            });

            if (existingFriend) {
              await existingFriend.update(friendData);
              updatedFriendContacts.push(existingFriend);
            }
          } else {
            const newFriend = await ClientFriendContact.create({
              ...friendData,
              client_id: clientId,
            });
            updatedFriendContacts.push(newFriend);
          }
        }

        result.friends_contact = updatedFriendContacts;
      }

      //* Professional Contacts
      if (data.professional_contacts && Array.isArray(data.professional_contacts)) {
        const updatedProfessionalContacts = [];

        for (const professionalData of data.professional_contacts) {
          if (professionalData.id) {
            const existingProfessional = await ClientProfessionalContact.findOne({
              where: {
                id: professionalData.id,
                client_id: clientId,
              },
            });

            if (existingProfessional) {
              await existingProfessional.update(professionalData);
              updatedProfessionalContacts.push(existingProfessional);
            }
          } else {
            const newProfessional = await ClientProfessionalContact.create({
              ...professionalData,
              client_id: clientId,
            });
            updatedProfessionalContacts.push(newProfessional);
          }
        }

        result.professional_contacts = updatedProfessionalContacts;
      }

      //* Healthcare Providers
      if (data.healthcare_providers && Array.isArray(data.healthcare_providers)) {
        const updatedHealthcareProviders = [];

        for (const providerData of data.healthcare_providers) {
          if (providerData.id) {
            const existingProvider = await HealthcareProvider.findOne({
              where: {
                id: providerData.id,
                client_id: clientId,
                specialty_provider: false,
              },
            });

            if (existingProvider) {
              await existingProvider.update(providerData);
              updatedHealthcareProviders.push(existingProvider);
            }
          } else {
            const newProvider = await HealthcareProvider.create({
              ...providerData,
              client_id: clientId,
              specialty_provider: false,
            });
            updatedHealthcareProviders.push(newProvider);
          }
        }

        result.healthcare_providers = updatedHealthcareProviders;
      }

      //* Medical Conditions
      if (data.medical_conditions) {
        const existingMedicalCondition = await ClientMedicationCondition.findOne({
          where: { client_id: clientId },
        });

        if (existingMedicalCondition) {
          await existingMedicalCondition.update(data.medical_conditions);
          result.medical_conditions = existingMedicalCondition;
        } else {
          const newMedicalCondition = await ClientMedicationCondition.create({
            ...data.medical_conditions,
            client_id: clientId,
            primary_user_id: primaryUserId,
          });
          result.medical_conditions = newMedicalCondition;
        }
      }

      //* Medical Info
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
          });
          result.medical_info = newMedicalInfo;
        }
      }

      //* Care Recipient Questionnaire
      if (data.questionnaire) {
        const existingQuestionnaire = await CareRecipientQuestionnaire.findOne({
          where: { client_id: clientId },
        });

        if (existingQuestionnaire) {
          await existingQuestionnaire.update(data.questionnaire);
          result.questionnaire = existingQuestionnaire;
        } else {
          const newQuestionnaire = await CareRecipientQuestionnaire.create({
            ...data.questionnaire,
            client_id: clientId,
            primary_user_id: primaryUserId,
          });
          result.questionnaire = newQuestionnaire;
        }
      }

      resolve(result);
    } catch (error) {
      console.error("CareRecipientQuestionnaireService [saveOrUpdateDetails] Error:", error);
      reject(error);
    }
  });
