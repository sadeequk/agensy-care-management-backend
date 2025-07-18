const essentialDocumentService = require("../services/essential.document.service");
const { USER_ROLES, FORM_TYPES } = require("../constants");
const formHistoryService = require("../services/form.history.service");
const joiSchemas = require("../validation/essential.document.schemas");

exports.existing_details_get = async (req, res) => {
  try {
    const clientId = req.clientId;
    const details = await essentialDocumentService.getExistingDetails(clientId);
    return res.success(details);
  } catch (error) {
    console.error("EssentialDocumentController [existing_details_get] Error:", error);
    return res.serverError(error);
  }
};

exports.essential_document_post = async (req, res) => {
  try {
    const clientId = req.clientId;
    const userId = req.user.id;
    const primaryUserId = req.user.role == USER_ROLES.PRIMARY_USER ? req.user.id : req.user.primary_user_id;
    const validatedData = await joiSchemas.essential_document_post.validateAsync(req.body);
    const record = await essentialDocumentService.saveOrUpdateDetails(clientId, primaryUserId, validatedData);
    await formHistoryService.recordFormUpdate(clientId, userId, primaryUserId, FORM_TYPES.ESSENTIAL_DOCUMENT);
    return res.success(record);
  } catch (error) {
    console.error("EssentialDocumentController [essential_document_post] Error:", error);
    return res.serverError(error);
  }
};