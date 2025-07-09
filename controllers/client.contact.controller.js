const clientContactService = require("../services/client.contact.service");
const clientService = require("../services/client.service");
const joiSchemas = require("../validation/client.contact.schemas");
const { CONTACT_TYPES } = require("../constants/index");

exports.contact_get = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await clientContactService.getClientContactById(contactId);
    return res.success(contact);
  } catch (error) {
    console.error("ClientContactController [contact_get] Error:", error);
    return res.serverError(error);
  }
};

exports.client_contacts_get = async (req, res) => {
  try {
    const clientId = req.clientId;
    const contacts = await clientContactService.getClientContacts(clientId);
    return res.success(contacts);
  } catch (error) {
    console.error("ClientContactController [client_contacts_get] Error:", error);
    return res.serverError(error);
  }
};

exports.contact_post = async (req, res) => {
  try {
    const clientId = req.clientId;
    const results = await joiSchemas.contact_post.validateAsync(req.body);

    const client = await clientService.getClientWithAccessCheck(req.user.id, clientId);
    if (!client) {
      return res.fail("Client not found or you don't have permission to add contacts");
    }

    if (results.contact_type === CONTACT_TYPES.EMERGENCY) {
      const emergencyExists = await clientContactService.checkEmergencyContactExists(clientId);
      if (emergencyExists) {
        return res.fail("Client already has an emergency contact.");
      }
    }

    const contact = await clientContactService.createClientContact(client, { ...results });

    return res.success(contact);
  } catch (error) {
    console.error("ClientContactController [contact_post] Error:", error);
    return res.serverError(error);
  }
};

exports.contact_put = async (req, res) => {
  try {
    const clientId = req.clientId;
    const { contactId } = req.params;
    const validatedData = await joiSchemas.contact_put.validateAsync(req.body);


    if (validatedData.contact_type === CONTACT_TYPES.EMERGENCY) {
      const emergencyExists = await clientContactService.checkEmergencyContactExists(clientId, contactId);
      if (emergencyExists) {
        return res.fail("Client already has an emergency contact. Only one emergency contact is allowed per client.");
      }
    }

    const contact = await clientContactService.updateClientContact(contactId, validatedData);
    return res.success(contact);
  } catch (error) {
    console.error("ClientContactController [contact_put] Error:", error);
    return res.serverError(error);
  }
};

exports.status_put = async (req, res) => {
  try {
    const { contactId } = req.params;
    const { status } = await joiSchemas.updateContactStatusSchema.validateAsync(req.body);

    const contact = await clientContactService.updateContactStatus(contactId, status);
    return res.success(contact);
  } catch (error) {
    console.error("ClientContactController [status_put] Error:", error);
    return res.serverError(error);
  }
};

exports.contact_delete = async (req, res) => {
  try {
    const { contactId } = req.params;
    await clientContactService.deleteClientContact(contactId);
    return res.success({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("ClientContactController [contact_delete] Error:", error);
    return res.serverError(error);
  }
};

exports.contacts_get = async (req, res) => {
  try {
    const contacts = await clientContactService.getAllContacts();
    return res.success(contacts);
  } catch (error) {
    console.error("ClientContactController [all_contacts_get] Error:", error);
    return res.serverError(error);
  }
};
