const { ClientMedication, Client } = require("../models");

exports.createMedication = (medicationData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const medication = await ClientMedication.create(medicationData);
      resolve(medication);
    } catch (error) {
      console.error("ClientMedicationService [createMedication] Error:", error);
      reject(error);
    }
  });
};

exports.getAllMedications = (query = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const medications = await ClientMedication.findAll({
        where: query,
        order: [["created_at", "DESC"]],
        include: [
          {
            model: Client,
            as: "client",
            attributes: ["id", "first_name", "last_name"],
          },
        ],
      });
      resolve(medications);
    } catch (error) {
      reject(error);
    }
  });
};

exports.getMedicationsByClientId = (clientId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const medications = await ClientMedication.findAll({
        where: { client_id: clientId },
        order: [["created_at", "DESC"]],
      });
      resolve(medications);
    } catch (error) {
      reject(error);
    }
  });
};

exports.getMedicationById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const medication = await ClientMedication.findOne({ where: { id } });
      resolve(medication);
    } catch (error) {
      reject(error);
    }
  });
};

exports.updateMedication = (id, medicationData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const medication = await ClientMedication.findByPk(id);

      const updated = await medication.update(medicationData);
      resolve(updated);
    } catch (error) {
      reject(error);
    }
  });
};

exports.deleteMedication = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const medication = await ClientMedication.findByPk(id);

      await medication.destroy();
      resolve({ message: "Medication deleted successfully" });
    } catch (error) {
      reject(error);
    }
  });
};

exports.toggleMedicationActive = (medicationId, active) => {
  return new Promise(async (resolve, reject) => {
    try {
      const medication = await ClientMedication.findByPk(medicationId);
      medication.active = active;
      await medication.save();
      resolve(medication);
    } catch (error) {
      reject(error);
    }
  });
};
