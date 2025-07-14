const {
  CareRecipientQuestionnaire,
  Client,
  ClientMedical,
  ClientContact,
  ClientMedication,
  HealthcareProvider,
  ClientInsurance,
  FormsHistory,
  ClientRelative,
  ClientFriendContact,
  ClientProfessionalContact,
} = require("../models");
const { FORM_TYPES } = require("../constants");

exports.getExistingDetails = (clientId) =>
  new Promise(async (resolve, reject) => {
    try {
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
          "phone",
          "email",// have to add in client model
          "cultural_background",// have to add in client model
          "education",// have to add in client model
          "religion",// have to add in client model
          "active_religion_location",// have to add in client model
          "marital_status",
          "date_of_divorce_or_widowhood",// have to add in client model
          "loss_impact_description",// have to add in client model
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
      const relative = await ClientRelative.findAll({
        where: { client_id: clientId },
        attributes: ["id", "name", "address", "home_phone", "work_phone", "relationship", "email"],
      });

      const relativeData = relative || [];

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

    //   //* Medical Info
    //   const medicalInfo = await ClientMedical.findOne({
    //     where: { client_id: clientId },
    //     attributes: ["id", "allergies", "diagnoses", "surgical_history"],
    //   });

    //   const medicalInfoData = medicalInfo || {
    //     id: null,
    //     allergies: null,
    //     diagnoses: null,
    //     surgical_history: null,
    //   };

    //   //* Emergency Contact
    //   const emergencyContact = await ClientContact.findOne({
    //     where: {
    //       client_id: clientId,
    //       contact_type: "emergency",
    //     },
    //     attributes: ["id", "first_name", "last_name", "email", "phone", "relationship", "address"],
    //   });

    //   const emergencyContactData = emergencyContact || {
    //     id: null,
    //     first_name: null,
    //     last_name: null,
    //     email: null,
    //     phone: null,
    //     relationship: null,
    //     address: null,
    //   };

    //   //* Medications
    //   const medications = await ClientMedication.findAll({
    //     where: { client_id: clientId },
    //     attributes: ["id", "client_id", "medication_name", "dosage", "purpose", "prescribing_doctor", "refill_due"],
    //     order: [["created_at", "ASC"]],
    //   });

    //   const medicationsData = medications || [];

    //   //* Healthcare Providers
    //   const healthcareProviders = await HealthcareProvider.findAll({
    //     where: {
    //       client_id: clientId,
    //       specialty_provider: false,
    //     },
    //     attributes: [
    //       "id",
    //       "provider_type",
    //       "provider_name",
    //       "specialty",
    //       "address",
    //       "phone",
    //       "last_visit",
    //       "next_visit",
    //     ],
    //     order: [["created_at", "ASC"]],
    //   });

    //   const healthcareProvidersData = healthcareProviders || [];

    //   //* Care Recipient Questionnaire
    //   const questionnaire = await CareRecipientQuestionnaire.findOne({
    //     where: { client_id: clientId },
    //     attributes: [
    //       "id",
    //       "preferred_name",
    //       "date_of_birth",
    //       "gender",
    //       "marital_status",
    //       "living_situation",
    //       "emergency_contact_name",
    //       "emergency_contact_phone",
    //       "emergency_contact_relationship",
    //       "primary_physician",
    //       "physician_phone",
    //       "allergies",
    //       "current_medications",
    //       "medical_conditions",
    //       "preferred_care_time",
    //       "care_preferences",
    //       "mobility_assistance",
    //       "personal_care_assistance",
    //       "medication_management",
    //       "meal_preparation",
    //       "housekeeping",
    //       "transportation",
    //       "special_instructions",
    //       "cultural_preferences",
    //       "language_preference",
    //       "religious_preferences",
    //       "insurance_provider",
    //       "insurance_policy_number",
    //       "medicare_number",
    //       "medicaid_number",
    //     ],
    //   });

    //   const questionnaireData = questionnaire || {
    //     id: null,
    //     preferred_name: null,
    //     date_of_birth: null,
    //     gender: null,
    //     marital_status: null,
    //     living_situation: null,
    //     emergency_contact_name: null,
    //     emergency_contact_phone: null,
    //     emergency_contact_relationship: null,
    //     primary_physician: null,
    //     physician_phone: null,
    //     allergies: null,
    //     current_medications: null,
    //     medical_conditions: null,
    //     preferred_care_time: null,
    //     care_preferences: null,
    //     mobility_assistance: false,
    //     personal_care_assistance: false,
    //     medication_management: false,
    //     meal_preparation: false,
    //     housekeeping: false,
    //     transportation: false,
    //     special_instructions: null,
    //     cultural_preferences: null,
    //     language_preference: null,
    //     religious_preferences: null,
    //     insurance_provider: null,
    //     insurance_policy_number: null,
    //     medicare_number: null,
    //     medicaid_number: null,
    //   };


      const generalDetails = {
        last_update: lastUpdate,
        client_info: clientInfo,
        insurance: insuranceData,
        relatives: relativeData,
        friends_contact: friendContactData,
        professional_contacts: professionalContactsData,
        // medical_info: medicalInfoData,
        // emergency_contact: emergencyContactData,
        // medications: medicationsData,
        // healthcare_providers: healthcareProvidersData,
        // questionnaire: questionnaireData,
      };

      resolve(generalDetails);
    } catch (error) {
      console.error("CareRecipientQuestionnaireService [getExistingDetails] Error:", error);
      reject(error);
    }
  });
