const {
  Client,
  ClientMedical,
  ClientContact,    
  ClientMedication,
  HealthcareProvider,
  ClientHomeHealthAgency,
  HealthHistoryForm,
  ClientHospitalization,
  FormsHistory,
} = require("../models");
const { CONTACT_TYPES,FORM_TYPES } = require("../constants");
const { Op } = require("sequelize");
const today = new Date();

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

      //* Medical Info
      const medicalInfo = await ClientMedical.findOne({
        where: { client_id: clientId },
        attributes: ["id", "diagnoses"],
      });
      const medicalInfoData = medicalInfo || {
        id: null,
        diagnoses: null,
      };

      //* Medications
      const medications = await ClientMedication.findAll({
        where: { client_id: clientId },
        attributes: ["id", "medication_name", "dosage", "prescribing_doctor", "start_date", "end_date"],
      });
      const medicationsData = medications || [];

      //* Healthcare Provider
      const healthcareProviders = await HealthcareProvider.findOne({
        where: {
          client_id: clientId,
          specialty_provider: true,
        },
        attributes: ["id", "provider_name", "address", "phone", "notes", "follow_up"],
      });

      const healthcareProvidersData = healthcareProviders || {
        id: null,
        provider_name: null,
        address: null,
        phone: null,
        follow_up: null,
        notes: null,
      };

      //* Home Health Agency
      const clientHomeHealthAgency = await ClientHomeHealthAgency.findOne({
        where: { client_id: clientId },
        attributes: ["id", "name", "phone", "address", "fax", "service_received", "start_date", "discharge_date"],
      });

      const clientHomeHealthAgencyData = clientHomeHealthAgency || {
        id: null,
        name: null,
        phone: null,
        address: null,
        fax: null,
        service_received: null,
        start_date: null,
        discharge_date: null,
      };

      //* Hospitalization
      const hospitalization = await ClientHospitalization.findOne({
        where: { client_id: clientId },
        attributes: ["id", "admitting_diagnosis", "treatment"],
      });
      const hospitalizationData = hospitalization || {
        id: null,
        admitting_diagnosis: null,
        treatment: null,
      };

      //* Health History Form
      const healthHistory = await HealthHistoryForm.findOne({
        where: { client_id: clientId },
        attributes: ["id", "what_worked", "date", "notes", "description_of_health_concern", "onset_of_symptoms", "frequency_of_symptoms", "severity_of_symptoms"],
      });
      const healthHistoryData = healthHistory || {
        id: null,
        what_worked: null,
        date: null,
        notes: null,
        description_of_health_concern: null,
        onset_of_symptoms: null,
        frequency_of_symptoms: null,
        severity_of_symptoms: null,
      };

      const generalDetails = {
        last_update: lastUpdate,
        medical_info: medicalInfoData,
        // medication_started: medicationStartedData,
        // medication_stopped: medicationStoppedData,
        medications: medicationsData,
        healthcare_providers: healthcareProvidersData,
        health_history: healthHistoryData,
        home_health_agency: clientHomeHealthAgencyData,
        hospitalization: hospitalizationData,
        // medical_conditions: medicalConditionsData,
        health_history: healthHistoryData,
      };

      resolve(generalDetails);
    } catch (error) {
      console.error("FaceSheetShortFormService [getGeneralDetails] Error:", error);
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

      //* Home Health Agency
      if (data.home_health_agency) {
        const existingHomeHealthAgency = await ClientHomeHealthAgency.findOne({
          where: { client_id: clientId },
        });

        if (existingHomeHealthAgency) {
          await existingHomeHealthAgency.update(data.home_health_agency);
          result.home_health_agency = existingHomeHealthAgency;
        } else {
          const newHomeHealthAgency = await ClientHomeHealthAgency.create({
            ...data.home_health_agency,
            client_id: clientId,
            primary_user_id: primaryUserId,
          });
          result.home_health_agency = newHomeHealthAgency;
        }
      }

      //* Hospitalization
      if (data.hospitalization) {
        const existingHospitalization = await ClientHospitalization.findOne({
          where: { client_id: clientId },
        });

        if (existingHospitalization) {
          await existingHospitalization.update(data.hospitalization);
          result.hospitalization = existingHospitalization;
        } else {
          const newHospitalization = await ClientHospitalization.create({
            ...data.hospitalization,
            client_id: clientId,
            primary_user_id: primaryUserId,
          });
          result.hospitalization = newHospitalization;
        }
      }

      //* Health History Form
      if (data.health_history) {
        const existingHealthHistory = await HealthHistoryForm.findOne({
          where: { client_id: clientId },
        });

        if (existingHealthHistory) {
          await existingHealthHistory.update(data.health_history);
          result.health_history = existingHealthHistory;
        } else {
          const newHealthHistory = await HealthHistoryForm.create({
            ...data.health_history,
            client_id: clientId,
            primary_user_id: primaryUserId,
          });
          result.health_history = newHealthHistory;
        }
      }

      //* Record form update
      await FormUpdateHistoryService.recordFormUpdate(clientId, primaryUserId, "health_history");

      //* Resolve with updated details
      const allDetails = await this.getExistingDetails(clientId);
      resolve(allDetails);
    } catch (error) {
      console.error("HealthHistoryFormService [saveOrUpdateDetails] Error:", error);
      reject(error);
    }
  });
