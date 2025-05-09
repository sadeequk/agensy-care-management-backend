const { Client } = require("../models/index");

module.exports.createClient = (clientData) =>
  new Promise(async (resolve, reject) => {
    try {
      const client = await Client.create(clientData);
      resolve(client);
    } catch (error) {
      console.error("ClientService [createClient] Error:", error);
      reject(error);
    }
  });
