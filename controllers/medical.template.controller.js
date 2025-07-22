const MedicalTemplateService = require("../services/medical.template.service");
const joiSchemas = require("../validation/medical.template.schemas");
const { USER_ROLES, FORM_TYPES } = require("../constants");
const formHistoryService = require("../services/form.history.service");

exports.existing_details_get = async (req, res) => {
  try {
    const clientId = req.clientId;
    const details = await MedicalTemplateService.getExistingDetails(clientId);
    return res.success(details);
  } catch (error) {
    console.error("MedicalTemplateController [getExistingDetails] Error:", error);
    return res.serverError(error);
  }
};

exports.medical_template_post = async (req, res) => {
  try {
    const primaryUserId = req.user.role == USER_ROLES.PRIMARY_USER ? req.user.id : req.user.primary_user_id;
    const clientId = req.clientId;
    const userId = req.user.id;
    const data = await joiSchemas.medical_template_post.validateAsync(req.body);
    const result = await MedicalTemplateService.saveOrUpdateDetails(clientId, data, primaryUserId);
    await formHistoryService.recordFormUpdate(clientId, userId, primaryUserId, FORM_TYPES.MEDICAL_TEMPLATE);
    return res.success(result);
  } catch (error) {
    console.error("MedicalTemplateController [saveOrUpdateDetails] Error:", error);
    return res.serverError(error);
  }
}; 