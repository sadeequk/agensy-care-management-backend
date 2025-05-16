const { Client, ClientContact } = require("../models");

module.exports.createClientContact = (client, contactData) =>
  new Promise(async (resolve, reject) => {
    try {
      const contact = await ClientContact.create(contactData);
      await client.addContact(contact);
      resolve(contact);
    } catch (error) {
      console.error("ClientContactService [createClientContact] Error:", error);
      reject(error);
    }
  });

module.exports.updateClientContact = (contactId, contactData) =>
  new Promise(async (resolve, reject) => {
    try {
      const contact = await ClientContact.findByPk(contactId);
      if (!contact) {
        return reject(new Error("Contact not found"));
      }

      await contact.update(contactData);
      resolve(contact);
    } catch (error) {
      console.error("ClientContactService [updateClientContact] Error:", error);
      reject(error);
    }
  });

module.exports.getClientContacts = (clientId) =>
  new Promise(async (resolve, reject) => {
    try {
      const client = await Client.findByPk(clientId, {
        include: [
          {
            model: ClientContact,
            as: "contacts",
          },
        ],
      });
      resolve(client.contacts);
    } catch (error) {
      console.error("ClientContactService [getClientContacts] Error:", error);
      reject(error);
    }
  });

module.exports.getClientContactById = (contactId) =>
  new Promise(async (resolve, reject) => {
    try {
      const contact = await ClientContact.findByPk(contactId);

      if (!contact) {
        return reject(new Error("Contact not found"));
      }

      resolve(contact);
    } catch (error) {
      console.error("ClientContactService [getClientContactById] Error:", error);
      reject(error);
    }
  });

module.exports.deleteClientContact = (contactId) =>
  new Promise(async (resolve, reject) => {
    try {
      const contact = await ClientContact.findByPk(contactId, {
        include: [
          {
            model: Client,
            as: "client",
          },
        ],
      });

      if (!contact) {
        return reject(new Error("Contact not found"));
      }

      if (!contact.client) {
        return reject(new Error("Associated client not found"));
      }

      await contact.destroy();
      resolve(true);
    } catch (error) {
      console.error("ClientContactService [deleteClientContact] Error:", error);
      reject(error);
    }
  });

module.exports.updateContactStatus = (contactId, status) =>
  new Promise(async (resolve, reject) => {
    try {
      const contact = await ClientContact.findByPk(contactId, {
        include: [
          {
            model: Client,
            as: "client",
          },
        ],
      });

      if (!contact) {
        return reject(new Error("Contact not found"));
      }

      if (!contact.client) {
        return reject(new Error("Associated client not found"));
      }

      await contact.update({ active: status });
      resolve(contact);
    } catch (error) {
      console.error("ClientContactService [updateContactStatus] Error:", error);
      reject(error);
    }
  });

module.exports.getAllContacts = (clientId) =>
  new Promise(async (resolve, reject) => {
    try {
      const client = await Client.findByPk(clientId);
      if (!client) {
        return reject(new Error("Client not found"));
      }
      const contacts = await client.getContacts();
      resolve(contacts);
    } catch (error) {
      console.error("ClientContactService [getAllContacts] Error:", error);
      reject(error);
    }
  });
