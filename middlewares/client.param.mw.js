const clientService = require("../services/client.service");

const setClientId = async (req, res, next, id) => {
  try {
    // UUID validation regex
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(id)) {
      return res.fail("Invalid client ID format");
    }

    const client = await clientService.readClient(id);

    if (!client) {
      return res.fail("Client not found");
    }

    req.clientId = id;
    req.client = client;
    next();
  } catch (error) {
    console.error("ClientParamMiddleware [setClientId] Error:", error);
    return res.fail("Internal server error");
  }
};

module.exports = setClientId;
