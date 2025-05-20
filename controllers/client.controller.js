const clientService = require("../services/client.service");
const joiSchemas = require("../validation/client.schemas");

exports.client_post = async (req, res) => {
  try {
    const results = await joiSchemas.client_post.validateAsync(req.body);
    const client = await clientService.createClient(req.user.id, results);
    return res.success(client);
  } catch (error) {
    console.error("ClientController [client_post] Error:", error);
    return res.serverError(error);
  }
};

exports.client_put = async (req, res) => {
  try {
    const { clientId } = req.params;
    const results = await joiSchemas.client_put.validateAsync(req.body);

    const client = await clientService.updateClient(clientId, results);
    return res.success(client);
  } catch (error) {
    console.error("ClientController [client_put] Error:", error);
    return res.serverError(error);
  }
};

exports.client_get = async (req, res) => {
  try {
    const { clientId } = req.params;
    const client = await clientService.getClientById(clientId);
    return res.success(client);
  } catch (error) {
    console.error("ClientController [client_get] Error:", error);
    return res.serverError(error);
  }
};

exports.clients_get = async (req, res) => {
  try {
    const clients = await clientService.getUserClients(req.user.id);
    return res.success(clients);
  } catch (error) {
    console.error("ClientController [clients_get] Error:", error);
    return res.serverError(error);
  }
};

exports.status_put = async (req, res) => {
  try {
    const { clientId } = req.params;
    const { status } = await joiSchemas.updateClientStatusSchema.validateAsync(req.body);

    const client = await clientService.updateClientStatus(clientId, status);
    return res.success(client);
  } catch (error) {
    console.error("ClientController [status_put] Error:", error);
    return res.serverError(error);
  }
};

exports.hospital_pharmacy_put = async (req, res) => {
  try {
    const { clientId } = req.params;
    const results = await joiSchemas.hospital_pharmacy_put.validateAsync(req.body);

    const client = await clientService.updateClient(clientId, results);
    return res.success(client);
  } catch (error) {
    console.error("ClientController [updateHospitalPharmacy] Error:", error);
    return res.serverError(error);
  }
};
