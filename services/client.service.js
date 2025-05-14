const { Client, ClientContact } = require("../models");
const clientContactService = require("./client.contact.service");

module.exports.createClient = (userId, clientData) =>
  new Promise(async (resolve, reject) => {
    try {
      const client = await Client.create({
        ...clientData,
        primary_user_id: userId,
      });
      resolve(client);
    } catch (error) {
      console.error("ClientService [createClient] Error:", error);
      reject(error);
    }
  });

module.exports.updateClient = (userId, clientId, clientData) =>
  new Promise(async (resolve, reject) => {
    try {
      const client = await Client.findOne({
        where: {
          id: clientId,
          primary_user_id: userId,
        },
      });

      if (!client) {
        return reject(new Error("Client not found or you don't have permission to update this client"));
      }

      await client.update(clientData);
      resolve(client);
    } catch (error) {
      console.error("ClientService [updateClient] Error:", error);
      reject(error);
    }
  });

module.exports.getClientById = (userId, clientId) =>
  new Promise(async (resolve, reject) => {
    try {
      const client = await Client.findOne({
        where: {
          id: clientId,
          primary_user_id: userId,
        },
        include: [
          {
            model: ClientContact,
            as: "ClientContacts",
          },
        ],
      });

      if (!client) {
        return reject(new Error("Client not found or you don't have permission to view this client"));
      }

      resolve(client);
    } catch (error) {
      console.error("ClientService [getClientById] Error:", error);
      reject(error);
    }
  });

module.exports.getUserClients = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const clients = await Client.findAll({
        where: {
          primary_user_id: userId,
        },
        include: [
          {
            model: ClientContact,
            as: "ClientContacts",
          },
        ],
        order: [["created_at", "DESC"]],
      });

      resolve(clients);
    } catch (error) {
      console.error("ClientService [getUserClients] Error:", error);
      reject(error);
    }
  });

module.exports.updateClientStatus = (userId, clientId, status) =>
  new Promise(async (resolve, reject) => {
    try {
      const client = await Client.findOne({
        where: {
          id: clientId,
          primary_user_id: userId,
        },
      });

      if (!client) {
        return reject(new Error("Client not found or you don't have permission to update this client"));
      }

      await client.update({ active: status });
      resolve(client);
    } catch (error) {
      console.error("ClientService [updateClientStatus] Error:", error);
      reject(error);
    }
  });
