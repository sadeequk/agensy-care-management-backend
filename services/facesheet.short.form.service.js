const { CONTACT_TYPES } = require("../constants");
const {
  FaceSheetShortForm,
  Client,
  ClientMedical,
  ClientContact,
  ClientMedication,
  HealthcareProvider,
  User,
} = require("../models");

exports.getExistingDetails = (clientId) =>
  new Promise(async (resolve, reject) => {
    try {
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
        ],
      });

      const medicalInfo = await ClientMedical.findOne({
        where: { client_id: clientId },
        attributes: ["id", "allergies", "diagnoses", "surgical_history"],
      });

      const medicalInfoData = medicalInfo || {
        id: null,
        allergies: null,
        diagnoses: null,
        surgical_history: null,
      };

      const emergencyContact = await ClientContact.findOne({
        where: {
          client_id: clientId,
          contact_type: "emergency",
        },
        attributes: ["id", "first_name", "last_name", "email", "phone", "relationship", "address"],
        order: [["created_at", "ASC"]],
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

      const medications = await ClientMedication.findAll({
        where: { client_id: clientId },
        attributes: ["id", "client_id", "medication_name", "dosage", "purpose", "prescribing_doctor", "refill_due"],
        order: [["created_at", "ASC"]],
      });

      const medicationsData = medications || {
        id: null,
        medication_name: null,
        dosage: null,
        purpose: null,
        prescribing_doctor: null,
        refill_due: null,
      };

      const healthcareProviders = await HealthcareProvider.findAll({
        where: { client_id: clientId },
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

      const healthcareProvidersData = healthcareProviders || {
        id: null,
        provider_type: null,
        provider_name: null,
        specialty: null,
        address: null,
        phone: null,
        last_visit: null,
        next_visit: null,
      };

      const shortForm = await FaceSheetShortForm.findOne({
        where: { client_id: clientId },
        attributes: [
          "id",
          "advance_directives",
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
        advance_directives: null,
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

      const generalDetails = {
        client_info: clientInfo,
        medical_info: medicalInfoData,
        emergency_contact: emergencyContactData,
        medications: medicationsData,
        healthcare_providers: healthcareProvidersData,
        short_form: shortFormData,
      };

      resolve(generalDetails);
    } catch (error) {
      console.error("FaceSheetShortFormService [getGeneralDetails] Error:", error);
      reject(error);
    }
  });

exports.updateFaceSheetShortForm = (clientId, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = {};

      // Client Information
      if (data.client_info) {
        const clientRecord = await Client.findByPk(clientId);
        if (clientRecord) {
          await clientRecord.update(data.client_info);
          result.client_info = clientRecord;
        }
        await clientRecord.save();
      }

      // Medical Information
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

      // 3. Emergency Contact
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

      // 4.Medications
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

      // 5. Healthcare Providers
      if (data.healthcare_providers && Array.isArray(data.healthcare_providers)) {
        const updatedProviders = [];

        for (const providerData of data.healthcare_providers) {
          if (providerData.id) {
            // Update existing provider by ID
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
            });
            updatedProviders.push(newProvider);
          }
        }

        result.healthcare_providers = updatedProviders;
      }

      // 6. Handle Short Form
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

      // resolve(result)
      const allDetails = await this.getExistingDetails(clientId);
      resolve(allDetails);
    } catch (error) {
      console.error("FaceSheetShortFormService [updateFaceSheetShortForm] Error:", error);
      reject(error);
    }
  });
