const {
  Client,
  ClientContact,
  User,
  ClientNote,
  ClientMedication,
  HealthcareProvider,
  ClientMedical,
  Document,
} = require("../models");
const clientContactService = require("./client.contact.service");
const userService = require("./user.service");

module.exports.createClient = (userId, clientData) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await userService.getUserById(userId);

      const client = await Client.create(clientData); // added this  because  addClient expects an existing client instance
      await user.addClient(client);

      resolve(client);
    } catch (error) {
      console.error("ClientService [createClient] Error:", error);
      reject(error);
    }
  });

module.exports.updateClient = (clientId, clientData) =>
  new Promise(async (resolve, reject) => {
    try {
      const client = await Client.findByPk(clientId);

      await client.update(clientData);
      resolve(client);
    } catch (error) {
      console.error("ClientService [updateClient] Error:", error);
      reject(error);
    }
  });

module.exports.getClientById = (clientId) =>
  new Promise(async (resolve, reject) => {
    try {
      const client = await Client.findByPk(clientId, {
        include: [
          {
            model: User,
            as: "Users",
            through: { attributes: [] }, // to exclude  UserClients data
            attributes: ["id", "first_name", "last_name", "email", "role", "relation"],
            include: [
              {
                model: User,
                as: "subUsers",
                attributes: ["id", "first_name", "last_name", "email", "role", "relation"],
              },
            ],
          },
          {
            model: ClientContact,
            as: "contacts",
          },
          {
            model: ClientNote,
            as: "clientNotes",
          },
          {
            model: ClientMedication,
            as: "medications",
          },
          {
            model: HealthcareProvider,
            as: "healthcareProviders",
          },
          {
            model: ClientMedical,
            as: "medical",
          },
          {
            model: Document,
            as: "documents",
            include: [
              {
                model: User,
                as: "uploadedBy",
                attributes: ["id", "first_name", "last_name"],
              },
            ],
          },
        ],
      });
      resolve(client);
    } catch (error) {
      console.error("ClientService [getClientById] Error:", error);
      reject(error);
    }
  });

module.exports.readClient = (clientId) =>
  new Promise(async (resolve, reject) => {
    try {
      const client = await Client.findByPk(clientId);
      resolve(client);
    } catch (error) {
      console.error("ClientService [getClientById] Error:", error);
      reject(error);
    }
  });

module.exports.getUserClients = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        where: { id: userId },
        include: [
          {
            model: Client,
            through: { attributes: [] }, // to exclude UserClients data
            include: [
              {
                model: User,
                as: "Users",
                through: { attributes: [] }, // to exclude UserClients data
                attributes: ["id", "first_name", "last_name", "email", "role", "relation"],
                include: [
                  {
                    model: User,
                    as: "subUsers",
                    attributes: ["id", "first_name", "last_name", "email", "role", "relation"],
                  },
                ],
              },
              {
                model: ClientContact,
                as: "contacts",
              },
              {
                model: ClientNote,
                as: "clientNotes",
              },
              {
                model: ClientMedication,
                as: "medications",
              },
              {
                model: HealthcareProvider,
                as: "healthcareProviders",
              },
              {
                model: ClientMedical,
                as: "medical",
              },
              {
                model: Document,
                as: "documents",
                include: [
                  {
                    model: User,
                    as: "uploadedBy",
                    attributes: ["id", "first_name", "last_name"],
                  },
                ],
              },
            ],
          },
        ],
      });

      resolve(user.Clients);
    } catch (error) {
      console.error("ClientService [getUserClients] Error:", error);
      reject(error);
    }
  });

module.exports.updateClientStatus = (clientId, status) =>
  new Promise(async (resolve, reject) => {
    try {
      const client = await Client.findByPk(clientId);

      await client.update({ active: status });
      resolve(client);
    } catch (error) {
      console.error("ClientService [updateClientStatus] Error:", error);
      reject(error);
    }
  });

// Ensures user has access to client through the UserClients conjunction table
module.exports.getClientWithAccessCheck = (userId, clientId) =>
  new Promise(async (resolve, reject) => {
    try {
      const client = await Client.findOne({
        where: { id: clientId },
        include: [
          {
            model: User,
            where: { id: userId },
            through: { attributes: [] }, // Using UserClients conjunction table
          },
        ],
      });

      resolve(client);
    } catch (error) {
      console.error("ClientService [getClientWithAccessCheck] Error:", error);
      reject(error);
    }
  });
