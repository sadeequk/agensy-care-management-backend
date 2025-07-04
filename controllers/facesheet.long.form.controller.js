const faceSheetLogFormService = require("../services/facesheet.long.form.service");
const joiSchemas = require("../validation/facesheet.long.form.schemas");
const { USER_ROLES } = require("../constants");

exports.existing_details_get = async (req, res) => {
  try {
    const clientId = req.clientId;
    const existingDetails = await faceSheetLogFormService.getExistingDetails(clientId);
    return res.success(existingDetails);
  } catch (error) {
    console.error("FacesheetLogController [existing_details_get] Error:", error);
    return res.serverError(error);
  }
};

exports.face_sheet_log_post = async (req, res) => {
  try {
    const primaryUserId = req.user.role == USER_ROLES.PRIMARY_USER ? req.user.id : req.user.primary_user_id;
    const clientId = req.clientId;
    const validatedData = await joiSchemas.facesheet_put.validateAsync(req.body);
    const record = await faceSheetLogFormService.updateFaceSheetLongForm(clientId, primaryUserId, validatedData);
    return res.success(record);
  } catch (error) {
    console.error("FacesheetLogController [face_sheet_log_post] Error:", error);
    return res.serverError(error);
  }
};
