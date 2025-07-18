const careRecipientQuestionnaireService = require("../services/care.recipient.questionnaire.service");
const joiSchemas = require("../validation/care.recipient.questionnaire.schemas");
const { USER_ROLES, FORM_TYPES } = require("../constants");
const formHistoryService = require("../services/form.history.service");

exports.existing_details_get = async (req, res) => {
  try {
    const clientId = req.clientId;
    const primaryUserId = req.user.role == USER_ROLES.PRIMARY_USER ? req.user.id : req.user.primary_user_id;
    console.log("primaryUserId", primaryUserId);
    const details = await careRecipientQuestionnaireService.getExistingDetails(clientId, primaryUserId);
    return res.success(details);
  } catch (error) {
    console.error("CareRecipientQuestionnaireController [existing_details_get] Error:", error);
    return res.serverError(error);
  }
};

exports.care_recipient_questionnaire_post = async (req, res) => {
  try {
    const userId = req.user.id;
    const clientId = req.clientId;
    const primaryUserId = req.user.role == USER_ROLES.PRIMARY_USER ? req.user.id : req.user.primary_user_id;
    const validatedData = await joiSchemas.care_recipient_questionnaire_post.validateAsync(req.body);
    const record = await careRecipientQuestionnaireService.saveOrUpdateDetails(clientId, primaryUserId, validatedData);
    
    await formHistoryService.recordFormUpdate(clientId, userId, primaryUserId, FORM_TYPES.CARE_RECIPIENT_QUESTIONNAIRE);
    return res.success(record);
  } catch (error) {
    console.error("CareRecipientQuestionnaireController [care_recipient_questionnaire_post] Error:", error);
    return res.serverError(error);
  }
}; 