const { Client, ClientContact } = require("../models");
const { CONTACT_TYPES } = require("../constants/index");

module.exports.checkEmergencyContactExists = (clientId, contactId = null) =>
  new Promise(async (resolve, reject) => {
    try {
      if (contactId) {
        const currentContact = await ClientContact.findByPk(contactId);
        if (currentContact && currentContact.contact_type === CONTACT_TYPES.EMERGENCY) {
          resolve(null);
          return;
        }
      }
      const existingEmergencyContact = await ClientContact.findOne({
        where: {
          client_id: clientId,
          contact_type: CONTACT_TYPES.EMERGENCY,
        },
      });
      resolve(existingEmergencyContact);
    } catch (error) {
      console.error("ClientContactService [checkEmergencyContactExists] Error:", error);
      reject(error);
    }
  });

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
      const contacts = await client.getContacts();
      resolve(contacts);
    } catch (error) {
      console.error("ClientContactService [getAllContacts] Error:", error);
      reject(error);
    }
  });
