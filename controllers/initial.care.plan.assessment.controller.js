const InitialCarePlanAssessmentService = require("../services/initial.care.plan.assessment.service");
const joiSchemas = require("../validation/initial.care.plan.assessment.schemas.js");
const { USER_ROLES, FORM_TYPES } = require("../constants");
const formHistoryService = require("../services/form.history.service");

exports.existing_details_get = async (req, res) => {
  try {
    const clientId = req.clientId;
    const details = await InitialCarePlanAssessmentService.getExistingDetails(clientId);
    return res.success(details);
  } catch (error) {
    console.error("InitialCarePlanAssessmentController [getExistingDetails] Error:", error);
    return res.serverError(error);
  }
};

exports.initial_care_plan_assessment_post = async (req, res) => {
  try {
    const primaryUserId = req.user.role == USER_ROLES.PRIMARY_USER ? req.user.id : req.user.primary_user_id;
    const clientId = req.clientId;
    const userId = req.user.id;
    const data = await joiSchemas.initial_care_plan_assessment_post.validateAsync(req.body);
    const result = await InitialCarePlanAssessmentService.saveOrUpdateDetails(clientId, data, primaryUserId);
    await formHistoryService.recordFormUpdate(clientId, userId, primaryUserId, FORM_TYPES.INITIAL_CARE_PLAN_ASSESSMENT);
    return res.success(result);
  } catch (error) {
    console.error("InitialCarePlanAssessmentController [saveOrUpdateDetails] Error:", error);
    return res.serverError(error);
  }
}; 