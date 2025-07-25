const { ClientMedical, ClientMedication, HealthcareProvider, ClientHomeHealthAgency, HealthHistoryForm, FormsHistory } = require('../models');
const { FORM_TYPES } = require('../constants');

exports.getExistingDetails = (clientId) =>
  new Promise(async (resolve, reject) => {
    try {
      const lastUpdate = await FormsHistory.findOne({
        where: {
          client_id: clientId,
          form_type: FORM_TYPES.HEALTH_HISTORY,
        },
        order: [['created_at', 'DESC']],
      });

      //* Medical Info
      const medicalInfo = await ClientMedical.findOne({
        where: { client_id: clientId },
        attributes: ['id', 'diagnoses'],
      });
      const medicalInfoData = medicalInfo || {
        id: null,
        diagnoses: null,
      };

      //* Medications
      const medications = await ClientMedication.findAll({
        where: { client_id: clientId },
        attributes: ['id', 'medication_name', 'frequency', 'dosage', 'prescribing_doctor', 'start_date', 'end_date'],
      });
      const medicationsData = medications || [];

      const healthcareProviders = await HealthcareProvider.findAll({
        where: {
          client_id: clientId,
        },
        attributes: ['id', 'provider_name', 'address', 'phone', 'notes', 'follow_up'],
        order: [['created_at', 'ASC']],
      });

      const healthcareProvidersData = healthcareProviders || [];

      //* Home Health Agency
      const clientHomeHealthAgency = await ClientHomeHealthAgency.findOne({
        where: { client_id: clientId },
        attributes: ['id', 'name', 'phone', 'address', 'fax', 'service_received', 'start_date', 'discharge_date'],
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

      const healthHistory = await HealthHistoryForm.findOne({
        where: { client_id: clientId },
        attributes: [
          'id',
          'what_worked',
          'date',
          'notes',
          'description_of_health_concern',
          'admitting_diagnosis',
          'treatment',
          'onset_of_symptoms',
          'frequency_of_symptoms',
          'severity_of_symptoms',
        ],
      });
      const healthHistoryData = healthHistory || {
        id: null,
        what_worked: null,
        date: null,
        notes: null,
        description_of_health_concern: null,
        admitting_diagnosis: null,
        treatment: null,
        onset_of_symptoms: null,
        frequency_of_symptoms: null,
        severity_of_symptoms: null,
      };

      const generalDetails = {
        last_update: lastUpdate,
        medical_info: medicalInfoData,
        medications: medicationsData,
        healthcare_providers: healthcareProvidersData,
        home_health_agency: clientHomeHealthAgencyData,
        health_history: healthHistoryData,
      };

      resolve(generalDetails);
    } catch (error) {
      console.error('FaceSheetShortFormService [getGeneralDetails] Error:', error);
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

      //* Healthcare Providers - Handle multiple providers
      if (data.healthcare_providers && Array.isArray(data.healthcare_providers)) {
        const updatedHealthcareProviders = [];

        for (const providerData of data.healthcare_providers) {
          if (providerData.id) {
            const existingProvider = await HealthcareProvider.findOne({
              where: {
                id: providerData.id,
                client_id: clientId,
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
            });
            updatedHealthcareProviders.push(newProvider);
          }
        }

        result.healthcare_providers = updatedHealthcareProviders;
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

      //* Resolve with updated details
      const allDetails = await this.getExistingDetails(clientId);
      resolve(allDetails);
    } catch (error) {
      console.error('HealthHistoryFormService [saveOrUpdateDetails] Error:', error);
      reject(error);
    }
  });
