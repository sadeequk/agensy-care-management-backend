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
    const { id } = req.params;
    const results = await joiSchemas.updateClientSchema.validateAsync(req.body);

    const client = await clientService.updateClient(req.user.id, id, results);
    return res.success(client);
  } catch (error) {
    console.error("ClientController [client_put] Error:", error);
    return res.serverError(error);
  }
};

exports.client_get = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await clientService.getClientById(id);
    return res.success(client);
  } catch (error) {
    if (error.message === "Client not found or user doesn't have access") {
      return res.fail(error.message);
    }
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
    const { id } = req.params;
    const { status } = await joiSchemas.updateClientStatusSchema.validateAsync(req.body);

    const client = await clientService.updateClientStatus(id, status);
    return res.success(client);
  } catch (error) {
    console.error("ClientController [status_put] Error:", error);
    return res.serverError(error);
  }
};
