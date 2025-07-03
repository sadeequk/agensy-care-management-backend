const { ClientMedical } = require("../models");

exports.checkMedicalRecordExists = (clientId) =>
  new Promise(async (resolve, reject) => {
    try {
      const existingRecord = await ClientMedical.findOne({
        where: { client_id: clientId },
      });
      resolve(!!existingRecord);
    } catch (error) {
      console.error("ClientMedicalService [checkMedicalRecordExists] Error:", error);
      reject(error);
    }
  });

exports.createMedicalRecord = (clientId, medicalData) =>
  new Promise(async (resolve, reject) => {
    try {
      const medicalRecord = await ClientMedical.create({
        ...medicalData,
        client_id: clientId,
      });
      resolve(medicalRecord);
    } catch (error) {
      console.error("ClientMedicalService [createMedicalRecord] Error:", error);
      reject(error);
    }
  });

exports.getMedicalRecordByClientId = (clientId) =>
  new Promise(async (resolve, reject) => {
    try {
      const medicalRecord = await ClientMedical.findOne({
        where: { client_id: clientId },
      });
      resolve(medicalRecord);
    } catch (error) {
      console.error("ClientMedicalService [getMedicalRecordByClientId] Error:", error);
      reject(error);
    }
  });

exports.updateMedicalRecord = (medicalId, medicalData) =>
  new Promise(async (resolve, reject) => {
    try {
      const medicalRecord = await ClientMedical.findByPk(medicalId);

      await medicalRecord.update(medicalData);
      resolve(medicalRecord);
    } catch (error) {
      console.error("ClientMedicalService [updateMedicalRecord] Error:", error);
      reject(error);
    }
  });

exports.deleteMedicalRecord = (medicalId) =>
  new Promise(async (resolve, reject) => {
    try {
      const medicalRecord = await ClientMedical.findByPk(medicalId);

      await medicalRecord.destroy();
      resolve(true);
    } catch (error) {
      console.error("ClientMedicalService [deleteMedicalRecord] Error:", error);
      reject(error);
    }
  });
