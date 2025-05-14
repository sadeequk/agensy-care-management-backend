const { ClientContact } = require("../models");

module.exports.createClientContact = (contactData) =>
  new Promise(async (resolve, reject) => {
    try {
      const contact = await ClientContact.create(contactData);
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
      const contacts = await ClientContact.findAll({
        where: { client_id: clientId },
        order: [["created_at", "DESC"]],
      });
      resolve(contacts);
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
      const contact = await ClientContact.findByPk(contactId);

      if (!contact) {
        return reject(new Error("Contact not found"));
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
      const contact = await ClientContact.findByPk(contactId);

      if (!contact) {
        return reject(new Error("Contact not found"));
      }

      await contact.update({ active: status });
      resolve(contact);
    } catch (error) {
      console.error("ClientContactService [updateContactStatus] Error:", error);
      reject(error);
    }
  });

module.exports.getAllContacts = () =>
  new Promise(async (resolve, reject) => {
    try {
      const contacts = await ClientContact.findAll({
        order: [["created_at", "DESC"]],
      });
      resolve(contacts);
    } catch (error) {
      console.error("ClientContactService [getAllContacts] Error:", error);
      reject(error);
    }
  });
