const {
  Client,
  ClientMedical,
  ClientContact,
  ClientMedication,
  HealthcareProvider,
  ClientVaccination,
  ClientHomeHealthAgency,
  ClientBloodwork,
  ClientCaregiverAgency,
  FaceSheetShortForm,
  User,
  ClientMedicationCondition,
  FormsHistory,
} = require("../models");
const { CONTACT_TYPES,FORM_TYPES } = require("../constants");


exports.getExistingDetails = (clientId) =>
  new Promise(async (resolve, reject) => {
    try {
      const lastUpdate = await FormsHistory.findOne({
        where: { 
          client_id: clientId, 
          form_type: FORM_TYPES.FACE_SHEET_LONG 
        },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "first_name", "last_name", "email"],
          },
        ],
        order: [["updated_at", "DESC"]],
      });

      //* Client Info
      const clientInfo = await Client.findByPk(clientId, {
        attributes: [
          "id",
          "first_name",
          "last_name",
          "ssn",
          "date_of_birth",
          "phone",
          "address",
          "preferred_hospital",
          "hospital_address",
          "hospital_phone",
          "pharmacy_name",
          "pharmacy_address",
          "pharmacy_phone",
          "pharmacy_fax",
          "code_status",
          "advance_directive",
          "language",
          "marital_status",
          "living_situation",
          "gender",
          "race",
          "last_care_plan_date",
        ],
      });

      //* Medical Info
      const medicalInfo = await ClientMedical.findOne({
        where: { client_id: clientId },
        attributes: [
          "id",
          "allergies",
          "diagnoses",
          "dietary_restrictions",
          "surgical_history",
          "cognitive_status",
          "last_cognitive_screening",
          "cognitive_score",
          "notes",
        ],
      });

      const medicalInfoData = medicalInfo || {
        id: null,
        allergies: null,
        diagnoses: null,
        surgical_history: null,
        dietary_restrictions: null,
        cognitive_status: null,
        last_cognitive_screening: null,
        cognitive_score: null,
        notes: null,
      };

      //* Emergency Contact
      const emergencyContact = await ClientContact.findOne({
        where: {
          client_id: clientId,
          contact_type: "emergency",
        },
        attributes: ["id", "first_name", "last_name", "email", "phone", "relationship", "address"],
      });

      const emergencyContactData = emergencyContact || {
        id: null,
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        relationship: null,
        address: null,
      };

      //* Medications
      const medications = await ClientMedication.findAll({
        where: { client_id: clientId },
        attributes: ["id", "client_id", "medication_name", "dosage", "purpose"],
        order: [["created_at", "ASC"]],
      });

      const medicationsData = medications || [];

      //* Healthcare Providers
      const healthcareProviders = await HealthcareProvider.findAll({
        where: {
          client_id: clientId,
          specialty_provider: false,
        },
        attributes: [
          "id",
          "provider_type",
          "provider_name",
          "specialty",
          "address",
          "phone",
          "last_visit",
          "next_visit",
        ],
        order: [["created_at", "ASC"]],
      });

      const healthcareProvidersData = healthcareProviders || [];

      //* Vaccinations
      const clientVaccinations = await ClientVaccination.findAll({
        where: { client_id: clientId },
        attributes: ["id", "name", "date", "next_vaccine"],
        order: [["created_at", "ASC"]],
      });

      const clientVaccinationsData = clientVaccinations || [];

      //* Home Health Agency
      const clientHomeHealthAgency = await ClientHomeHealthAgency.findOne({
        where: { client_id: clientId },
        attributes: [
          "id",
          "name",
          "phone",
          "address",
          "fax",
          "schedule",
          "prescribing_doctor",
          "start_date",
          "discharge_date",
        ],
      });

      const clientHomeHealthAgencyData = clientHomeHealthAgency || {
        id: null,
        name: null,
        phone: null,
        address: null,
        fax: null,
        schedule: null,
        prescribing_doctor: null,
        start_date: null,
        discharge_date: null,
      };

      //* Bloodwork
      const clientBloodwork = await ClientBloodwork.findAll({
        where: { client_id: clientId },
        attributes: ["id", "name", "date", "results", "ordered_by", "repeat"],
        order: [["created_at", "ASC"]],
      });

      const clientBloodworkData = clientBloodwork || [];

      //* Caregiver Agency
      const clientCaregiverAgency = await ClientCaregiverAgency.findOne({
        where: { client_id: clientId },
        attributes: [
          "id",
          "name",
          "phone",
          "address",
          "point_of_contact",
          "caregiver_schedule",
          "caregiver_duties",
          "important_information",
        ],
      });

      const clientCaregiverAgencyData = clientCaregiverAgency || {
        id: null,
        name: null,
        phone: null,
        address: null,
        point_of_contact: null,
        caregiver_schedule: null,
        caregiver_duties: null,
        important_information: null,
      };

      //* Face Sheet Short Form
      const shortForm = await FaceSheetShortForm.findOne({
        where: { client_id: clientId },
        attributes: [
          "id",
          "insurance",
          "medicare",
          "group_number",
          "id_number",
          "mpoa",
          "mpoa_phone",
          "mpoa_address",
          "dpoa",
          "dpoa_phone",
          "dpoa_address",
        ],
      });

      const shortFormData = shortForm || {
        client_id: null,
        insurance: null,
        medicare: null,
        group_number: null,
        id_number: null,
        mpoa: null,
        mpoa_phone: null,
        mpoa_address: null,
        dpoa: null,
        dpoa_phone: null,
        dpoa_address: null,
      };

      //* Medical Conditions
      const medicalConditions = await ClientMedicationCondition.findAll({
        where: { client_id: clientId },
        attributes: ["id", "condition", "onset_date", "notes"],
        order: [["created_at", "ASC"]],
      });

      const medicalConditionsData = medicalConditions || [];

      const generalDetails = {
        last_update: lastUpdate,
        client_info: clientInfo,
        medical_info: medicalInfoData,
        emergency_contact: emergencyContactData,
        medications: medicationsData,
        healthcare_providers: healthcareProvidersData,
        short_form: shortFormData,
        vaccinations: clientVaccinationsData,
        home_health_agency: clientHomeHealthAgencyData,
        bloodwork: clientBloodworkData,
        caregiver_agency: clientCaregiverAgencyData,
        medical_conditions: medicalConditionsData,
      };

      resolve(generalDetails);
    } catch (error) {
      console.error("FaceSheetShortFormService [getGeneralDetails] Error:", error);
      reject(error);
    }
  });

exports.updateFaceSheetLongForm = async (clientId, primaryUserId, data) =>
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
        await clientRecord.save();
      }

      //* Medical Information
      if (data.medical_info) {
        const existingMedical = await ClientMedical.findOne({
          where: { client_id: clientId },
        });

        if (existingMedical) {
          await existingMedical.update(data.medical_info);
          result.medical_info = existingMedical;
        } else {
          const newMedical = await ClientMedical.create({ ...data.medical_info, client_id: clientId });
          result.medical_info = newMedical;
        }
      }

      //* Emergency Contact
      if (data.emergency_contact) {
        const existingContact = await ClientContact.findOne({
          where: {
            client_id: clientId,
            contact_type: CONTACT_TYPES.EMERGENCY,
          },
        });
        if (existingContact) {
          await existingContact.update(data.emergency_contact);
          result.emergency_contact = existingContact;
        } else {
          const newContact = await ClientContact.create({
            ...data.emergency_contact,
            client_id: clientId,
            contact_type: CONTACT_TYPES.EMERGENCY,
          });
          result.emergency_contact = newContact;
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
            const newMedication = await ClientMedication.create({ ...medicationData, client_id: clientId });
            updatedMedications.push(newMedication);
          }
        }
        result.medications = updatedMedications;
      }

      //* Healthcare Providers
      if (data.healthcare_providers && Array.isArray(data.healthcare_providers)) {
        const updatedProviders = [];

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
              updatedProviders.push(existingProvider);
            }
          } else {
            const newProvider = await HealthcareProvider.create({ ...providerData, client_id: clientId });
            updatedProviders.push(newProvider);
          }
        }
        result.healthcare_providers = updatedProviders;
      }

      //* Vaccinations
      if (data.vaccinations && Array.isArray(data.vaccinations)) {
        const updatedVaccinations = [];

        for (const vaccinationData of data.vaccinations) {
          if (vaccinationData.id) {
            const existingVaccination = await ClientVaccination.findOne({
              where: {
                id: vaccinationData.id,
                client_id: clientId,
              },
            });
            if (existingVaccination) {
              await existingVaccination.update(vaccinationData);
              updatedVaccinations.push(existingVaccination);
            }
          } else {
            const newVaccination = await ClientVaccination.create({
              ...vaccinationData,
              client_id: clientId,
              primary_user_id: primaryUserId,
            });
            updatedVaccinations.push(newVaccination);
          }
        }
        result.vaccinations = updatedVaccinations;
      }

      //* Home Health Agency
      if (data.home_health_agency) {
        const existingHomeHealth = await ClientHomeHealthAgency.findOne({
          where: { client_id: clientId },
        });
        if (existingHomeHealth) {
          await existingHomeHealth.update(data.home_health_agency);
          result.home_health_agency = existingHomeHealth;
        } else {
          const newHomeHealth = await ClientHomeHealthAgency.create({
            ...data.home_health_agency,
            client_id: clientId,
            primary_user_id: primaryUserId,
          });
          result.home_health_agency = newHomeHealth;
        }
      }

      //* Bloodwork
      if (data.bloodwork && Array.isArray(data.bloodwork)) {
        const updatedBloodwork = [];
        for (const bloodworkData of data.bloodwork) {
          if (bloodworkData.id) {
            const existingBloodwork = await ClientBloodwork.findOne({
              where: {
                id: bloodworkData.id,
                client_id: clientId,
              },
            });
            if (existingBloodwork) {
              await existingBloodwork.update(bloodworkData);
              updatedBloodwork.push(existingBloodwork);
            }
          } else {
            const newBloodwork = await ClientBloodwork.create({
              ...bloodworkData,
              client_id: clientId,
              primary_user_id: primaryUserId,
            });
            updatedBloodwork.push(newBloodwork);
          }
        }
        result.bloodwork = updatedBloodwork;
      }

      //* Caregiver Agency
      if (data.caregiver_agency) {
        const existingCaregiver = await ClientCaregiverAgency.findOne({
          where: { client_id: clientId },
        });
        if (existingCaregiver) {
          await existingCaregiver.update(data.caregiver_agency);
          result.caregiver_agency = existingCaregiver;
        } else {
          const newCaregiver = await ClientCaregiverAgency.create({
            ...data.caregiver_agency,
            client_id: clientId,
            primary_user_id: primaryUserId,
          });
          result.caregiver_agency = newCaregiver;
        }
      }

      //* Short Form
      if (data.short_form) {
        const existingShortForm = await FaceSheetShortForm.findOne({
          where: { client_id: clientId },
        });

        if (existingShortForm) {
          await existingShortForm.update(data.short_form);
          result.short_form = existingShortForm;
        } else {
          const newShortForm = await FaceSheetShortForm.create({
            ...data.short_form,
            client_id: clientId,
          });
          result.short_form = newShortForm;
        }
      }

      //* Medical Conditions
      if (data.medical_conditions && Array.isArray(data.medical_conditions)) {
        const updatedMedicalConditions = [];
        for (const conditionData of data.medical_conditions) {
          if (conditionData.id) {
            const existingCondition = await ClientMedicationCondition.findOne({
              where: { id: conditionData.id, client_id: clientId },
            });
            if (existingCondition) {
              await existingCondition.update(conditionData);
              updatedMedicalConditions.push(existingCondition);
            }
          } else {
            const newCondition = await ClientMedicationCondition.create({
              ...conditionData,
              client_id: clientId,
              primary_user_id: primaryUserId,
            });
            updatedMedicalConditions.push(newCondition);
          }
        }
        result.medical_conditions = updatedMedicalConditions;
      }

      // Return all details
      const allDetails = await exports.getExistingDetails(clientId);
      resolve(allDetails);
    } catch (error) {
      console.error("FaceSheetLongFormService [updateFaceSheet] Error:", error);
      reject(error);
    }
  });
