const clientMedicalService = require("../services/client.medical.service");
const clientService = require("../services/client.service");
const joiSchemas = require("../validation/client.medical.schemas");

exports.medical_post = async (req, res) => {
  try {
    const clientId = req.clientId;
    const medicalData = await joiSchemas.medical_post.validateAsync(req.body);

    const client = await clientService.getClientWithAccessCheck(req.user.id, clientId);
    if (!client) {
      return res.fail("Client not found or you don't have permission to add medical information");
    }

    const existingRecord = await clientMedicalService.getMedicalRecordByClientId(clientId);
    if (existingRecord) {
      return res.fail("Medical record already exists for this client");
    }

    const medicalRecord = await clientMedicalService.createMedicalRecord(clientId, medicalData);
    return res.success(medicalRecord);
  } catch (error) {
    console.error("ClientMedicalController [medical_post] Error:", error);
    return res.serverError(error);
  }
};

exports.medical_get = async (req, res) => {
  try {
    const clientId = req.clientId;
    const medicalRecord = await clientMedicalService.getMedicalRecordByClientId(clientId);
    if (!medicalRecord) return res.fail("Medical record not found");
    return res.success(medicalRecord);
  } catch (error) {
    console.error("ClientMedicalController [medical_get] Error:", error);
    return res.serverError(error);
  }
};

exports.medical_put = async (req, res) => {
  try {
    const clientId = req.clientId;
    const medicalData = await joiSchemas.medical_put.validateAsync(req.body);

    const medicalRecord = await clientMedicalService.getMedicalRecordByClientId(clientId);
    if (!medicalRecord) return res.fail("Medical record not found");

    const updatedRecord = await clientMedicalService.updateMedicalRecord(medicalRecord.id, medicalData);
    return res.success(updatedRecord);
  } catch (error) {
    console.error("ClientMedicalController [medical_put] Error:", error);
    return res.serverError(error);
  }
};

exports.medical_delete = async (req, res) => {
  try {
    const clientId = req.clientId;
    const medicalRecord = await clientMedicalService.getMedicalRecordByClientId(clientId);
    if (!medicalRecord) return res.fail("Medical record not found");

    await clientMedicalService.deleteMedicalRecord(medicalRecord.id);
    return res.success({ message: "Medical record deleted successfully" });
  } catch (error) {
    console.error("ClientMedicalController [medical_delete] Error:", error);
    return res.serverError(error);
  }
};
