const { Client } = require("../models");

const setClientId = async (req, res, next, id) => {
  try {
    const client = await Client.findByPk(id);

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
