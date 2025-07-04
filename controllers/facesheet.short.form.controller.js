const facesheetShortFormService = require("../services/facesheet.short.form.service");
const joiSchemas = require("../validation/facesheet.short.form.schemas");

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
    const clientId = req.clientId;
    const validatedData = await joiSchemas.facesheet_put.validateAsync(req.body);
    const record = await facesheetShortFormService.updateFaceSheetShortForm(clientId, validatedData);

    return res.success(record);
  } catch (error) {
    console.error("FacesheetShortFormController [face_sheet_short_post] Error:", error);
    return res.serverError(error);
  }
};
