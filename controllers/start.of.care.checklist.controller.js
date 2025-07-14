const startOfCareChecklistService = require("../services/start.of.care.checklist.service");
const { USER_ROLES, FORM_TYPES } = require("../constants");
const formHistoryService = require("../services/form.history.service");
const joiSchemas = require("../validation/start.of.care.checklist.schemas");

exports.existing_details_get = async (req, res) => {
  try {
    const clientId = req.clientId;
    const details = await startOfCareChecklistService.getExistingDetails(clientId);
    return res.success(details);
  } catch (error) {
    console.error("StartOfCareChecklistController [existing_details_get] Error:", error);
    return res.serverError(error);
  }
};

exports.start_of_care_checklist_post = async (req, res) => {
  try {
    const userId = req.user.id;
    const clientId = req.clientId;
    const primaryUserId = req.user.role == USER_ROLES.PRIMARY_USER ? req.user.id : req.user.primary_user_id;
    const validatedData = await joiSchemas.start_of_care_checklist_post.validateAsync(req.body);
    const record = await startOfCareChecklistService.saveOrUpdateDetails(clientId, primaryUserId, validatedData);
    await formHistoryService.recordFormUpdate(clientId, userId, primaryUserId, FORM_TYPES.START_OF_CARE_CHECKLIST);
    return res.success(record);
  } catch (error) {
    console.error("StartOfCareChecklistController [start_of_care_checklist_post] Error:", error);
    return res.serverError(error);
  }
}; 