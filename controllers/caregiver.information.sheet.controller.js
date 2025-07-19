const caregiverInformationSheetService = require("../services/caregiver.information.sheet.service");
const { USER_ROLES, FORM_TYPES } = require("../constants");
const formHistoryService = require("../services/form.history.service");
const joiSchemas = require("../validation/caregiver.information.sheet.schemas");

exports.existing_details_get = async (req, res) => {
  try {
    const clientId = req.clientId;
    const details = await caregiverInformationSheetService.getExistingDetails(clientId);
    return res.success(details);
  } catch (error) {
    console.error("CaregiverInformationSheetController [existing_details_get] Error:", error);
    return res.serverError(error);
  }
};

exports.caregiver_information_sheet_post = async (req, res) => {
  try {
    const clientId = req.clientId;
    const userId = req.user.id;
    const primaryUserId = req.user.role == USER_ROLES.PRIMARY_USER ? req.user.id : req.user.primary_user_id;
    const validatedData = await joiSchemas.caregiver_information_sheet_post.validateAsync(req.body);
    const record = await caregiverInformationSheetService.saveOrUpdateDetails(clientId, primaryUserId, validatedData);
    await formHistoryService.recordFormUpdate(clientId, userId, primaryUserId, FORM_TYPES.CAREGIVER_INFORMATION_SHEET);
    return res.success(record);
  } catch (error) {
    console.error("CaregiverInformationSheetController [caregiver_information_sheet_post] Error:", error);
    return res.serverError(error);
  }
}; 