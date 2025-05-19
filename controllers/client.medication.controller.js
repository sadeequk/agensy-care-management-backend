const clientMedicationService = require("../services/client.medication.service");
const clientService = require("../services/client.service");
const joiSchemas = require("../validation/client.medication.schemas");
//
exports.client_medication_post = async (req, res) => {
  try {
    const clientId = req.clientId;
    const medicationData = await joiSchemas.medication_post.validateAsync(req.body);
    const client = await clientService.getClientWithAccessCheck(req.user.id, clientId);
    if (!client) {
      return res.fail("Client not found or you don't have permission to add medications");
    }

    const medication = await clientMedicationService.createMedication({
      ...medicationData,
      client_id: clientId,
    });

    return res.success(medication);
  } catch (error) {
    console.error("MedicationController [client_medication_post] Error:", error);
    return res.serverError(error);
  }
};
//
exports.client_medications_get = async (req, res) => {
  try {
    const clientId = req.clientId;
    const medications = await clientMedicationService.getMedicationsByClientId(clientId);
    return res.success(medications);
  } catch (error) {
    console.error("MedicationController [client_medications_get] Error:", error);
    return res.serverError(error);
  }
};

exports.client_medication_get = async (req, res) => {
  try {
    const { medicationId } = req.params;
    const medication = await clientMedicationService.getMedicationById(medicationId);
    if (!medication) return res.fail("Medication not found");

    return res.success(medication);
  } catch (error) {
    console.error("MedicationController [client_medication_get_by_id] Error:", error);
    return res.serverError(error);
  }
};

exports.client_medication_put = async (req, res) => {
  try {
    const { medicationId } = req.params;
    const medicationData = await joiSchemas.medication_put.validateAsync(req.body);

    const medication = await clientMedicationService.updateMedication(medicationId, medicationData);
    return res.success(medication);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.fail(error.message);
    }
    console.error("MedicationController [client_medication_put] Error:", error);
    return res.serverError(error);
  }
};

exports.client_medication_delete = async (req, res) => {
  try {
    const { medicationId } = req.params;
    await clientMedicationService.deleteMedication(medicationId);
    return res.success({ message: "Medication deleted successfully" });
  } catch (error) {
    console.error("MedicationController [client_medication_delete] Error:", error);
    return res.serverError(error);
  }
};

exports.client_medication_status_put = async (req, res) => {
  try {
    const { medicationId } = req.params;
    const { active } = await joiSchemas.medication_toggle_active.validateAsync(req.body);

    const medication = await clientMedicationService.toggleMedicationActive(medicationId, active);
    return res.success(medication);
  } catch (error) {
    console.error("MedicationController [client_medication_toggle_active] Error:", error);
    return res.serverError(error);
  }
};
