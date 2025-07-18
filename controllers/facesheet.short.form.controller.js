const facesheetShortFormService = require("../services/facesheet.short.form.service");
const joiSchemas = require("../validation/facesheet.short.form.schemas");
const { USER_ROLES ,FORM_TYPES} = require("../constants");
const formHistoryService = require("../services/form.history.service");

exports.existing_details_get = async (req, res) => {
  try {
    const clientId = req.clientId;

    const existingDetails = await facesheetShortFormService.getExistingDetails(clientId);

    return res.success(existingDetails);
  } catch (error) {
    console.error("FacesheetShortFormController [general_details_get] Error:", error);
    return res.serverError(error);
  }
};

exports.face_sheet_short_post = async (req, res) => {
  try {
    const userId = req.user.id;
    const clientId = req.clientId;
    const primaryUserId = req.user.role == USER_ROLES.PRIMARY_USER ? req.user.id : req.user.primary_user_id;
    const validatedData = await joiSchemas.facesheet_put.validateAsync(req.body);
    const record = await facesheetShortFormService.updateFaceSheetShortForm(clientId, validatedData);

    await formHistoryService.recordFormUpdate(clientId, userId, primaryUserId, FORM_TYPES.FACE_SHEET_SHORT);
    return res.success(record);
  } catch (error) {
    console.error("FacesheetShortFormController [face_sheet_short_post] Error:", error);
    return res.serverError(error);
  }
};
