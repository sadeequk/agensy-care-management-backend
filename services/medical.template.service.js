const {
  ClientMedical,
  ClientMedication,
  HealthcareProvider,
  MedicalTemplate,
  FormsHistory,
  Client,
} = require("../models");
const { FORM_TYPES } = require("../constants");

exports.getExistingDetails = (clientId) =>
  new Promise(async (resolve, reject) => {
    try {
      const lastUpdate = await FormsHistory.findOne({
        where: { 
          client_id: clientId, 
          form_type: FORM_TYPES.MEDICAL_TEMPLATE 
        },
        order: [["created_at", "DESC"]],
      });

      //* Client Information
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

      //* Medical Info
      const medicalInfo = await ClientMedical.findOne({
        where: { client_id: clientId },
        attributes: ["id", "diagnoses", "allergies", "surgical_history", "height", "weight", "blood_pressure", "temperature", "heart_rate", "additional_vitals"],
      });
      const medicalInfoData = medicalInfo || {
        id: null,
        diagnoses: null,
        allergies: null,
        surgical_history: null,
        height: null,
        weight: null,
        blood_pressure: null,
        temperature: null,
        heart_rate: null,
        additional_vitals: null,
      };

      //* Medications
      const medications = await ClientMedication.findAll({
        where: { client_id: clientId },
        attributes: ["id", "medication_name", "dosage","frequency", "notes", "start_date", "end_date"],
      });
      const medicationsData = medications || [];

      //* Healthcare Providers
      const healthcareProviders = await HealthcareProvider.findOne({
        where: {
          client_id: clientId,
          specialty_provider: true,
        },
        attributes: ["id", "provider_name", "address", "phone", "notes", "follow_up", "specialty"],
      });

      const healthcareProvidersData = healthcareProviders || {
        id: null,
        provider_name: null,
        address: null,
        phone: null,
        follow_up: null,
        notes: null,
        specialty: null,
      };

      //* Medical Template
      const medicalTemplate = await MedicalTemplate.findOne({
        where: { client_id: clientId },
        attributes: [
          "id", "date",
          "reason_for_visit", "top_3_concerns", "tests_labs_imaging", "visit_notes",
          "recommendations", "referrals", "follow_up", "report_given_to"
        ],
      });
      const medicalTemplateData = medicalTemplate || {
        id: null,
        date: null,
        reason_for_visit: null,
        top_3_concerns: null,
        tests_labs_imaging: null,
        visit_notes: null,
        medication_changes: null,
        recommendations: null,
        referrals: null,
        follow_up: null,
        report_given_to: null,
      };

      const generalDetails = {
        last_update: lastUpdate,
        client_info: clientInfoData,
        medical_info: medicalInfoData,
        medications: medicationsData,
        healthcare_providers: healthcareProvidersData,
        medical_template: medicalTemplateData,
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

      //* Medical Information
      if (data.medical_info) {
        const existingMedical = await ClientMedical.findOne({
          where: { client_id: clientId },
        });

        if (existingMedical) {
          await existingMedical.update(data.medical_info);
          result.medical_info = existingMedical;
        } else {
          const newMedical = await ClientMedical.create({
            ...data.medical_info,
            client_id: clientId,
          });
          result.medical_info = newMedical;
        }
      }

      //* Medications
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
            });
            updatedMedications.push(newMedication);
          }
        }

        result.medications = updatedMedications;
      }

      //* Healthcare Providers
      if (data.healthcare_providers) {
        const existingProvider = await HealthcareProvider.findOne({
          where: {
            client_id: clientId,
            specialty_provider: true,
          },
        });

        if (existingProvider) {
          await existingProvider.update(data.healthcare_providers);
          result.healthcare_providers = existingProvider;
        } else {
          const newProvider = await HealthcareProvider.create({
            ...data.healthcare_providers,
            client_id: clientId,
            specialty_provider: true,
          });
          result.healthcare_providers = newProvider;
        }
      }

      //* Medical Template
      if (data.medical_template) {
        const existingMedicalTemplate = await MedicalTemplate.findOne({
          where: { client_id: clientId },
        });

        if (existingMedicalTemplate) {
          await existingMedicalTemplate.update(data.medical_template);
          result.medical_template = existingMedicalTemplate;
        } else {
          const newMedicalTemplate = await MedicalTemplate.create({
            ...data.medical_template,
            client_id: clientId,
            primary_user_id: primaryUserId,
          });
          result.medical_template = newMedicalTemplate;
        }
      }

      //* Resolve with updated details
      const allDetails = await this.getExistingDetails(clientId);
      resolve(allDetails);
    } catch (error) {
      console.error("MedicalTemplateService [saveOrUpdateDetails] Error:", error);
      reject(error);
    }
  }); 