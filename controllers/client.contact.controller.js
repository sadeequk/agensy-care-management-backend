const clientContactService = require("../services/client.contact.service");
const clientService = require("../services/client.service");
const joiSchemas = require("../validation/client.contact.schemas");

exports.contacts_get = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await clientService.getClientById(req.user.id, id);
    if (!client) {
      return res.fail("Client not found or you don't have permission to view contacts");
    }

    const contacts = await clientContactService.getClientContacts(id);
    return res.success(contacts);
  } catch (error) {
    console.error("ClientContactController [contacts_get] Error:", error);
    return res.serverError(error);
  }
};

exports.contact_post = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await joiSchemas.create_client_contact_post.validateAsync(req.body);

    const client = await clientService.getClientById(req.user.id, id);
    if (!client) {
      return res.fail("Client not found or you don't have permission to add contacts");
    }

    const contact = await clientContactService.createClientContact({
      ...results,
      client_id: id,
    });

    return res.success(contact);
  } catch (error) {
    console.error("ClientContactController [contact_post] Error:", error);
    return res.serverError(error);
  }
};

exports.contact_put = async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = await joiSchemas.update_client_contact_put.validateAsync(req.body);

    const contact = await clientContactService.updateClientContact(id, validatedData);
    return res.success(contact);
  } catch (error) {
    console.error("ClientContactController [contact_put] Error:", error);
    return res.serverError(error);
  }
};

exports.status_put = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = await joiSchemas.updateContactStatusSchema.validateAsync(req.body);

    const contact = await clientContactService.updateContactStatus(id, status);
    return res.success(contact);
  } catch (error) {
    console.error("ClientContactController [status_put] Error:", error);
    return res.serverError(error);
  }
};

exports.contact_delete = async (req, res) => {
  try {
    const { id } = req.params;
    await clientContactService.deleteClientContact(id);
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
