const ComprehensiveCarePlanAssessmentService = require('../services/comprehensive.care.plan.assessment.service.js');
const joiSchemas = require('../validation/comprehensive.care.plan.assessment.schemas.js');
const { USER_ROLES, FORM_TYPES } = require('../constants/index.js');
const formHistoryService = require('../services/form.history.service.js');

exports.existing_details_get = async (req, res) => {
  try {
    const clientId = req.clientId;
    const details = await ComprehensiveCarePlanAssessmentService.getExistingDetails(clientId);
    return res.success(details);
  } catch (error) {
    console.error('InitialCarePlanAssessmentController [getExistingDetails] Error:', error);
    return res.serverError(error);
  }
};

exports.comprehensive_care_plan_assessment_post = async (req, res) => {
  try {
    const primaryUserId = req.user.role == USER_ROLES.PRIMARY_USER ? req.user.id : req.user.primary_user_id;
    const clientId = req.clientId;
    const userId = req.user.id;
    const data = await joiSchemas.comprehensive_care_plan_assessment_post.validateAsync(req.body);
    const result = await ComprehensiveCarePlanAssessmentService.saveOrUpdateDetails(clientId, data, primaryUserId);
    await formHistoryService.recordFormUpdate(clientId, userId, primaryUserId, FORM_TYPES.COMPREHENSIVE_CARE_PLAN_ASSESSMENT);
    return res.success(result);
  } catch (error) {
    console.error('ComprehensiveCarePlanAssessmentController [saveOrUpdateDetails] Error:', error);
    return res.serverError(error);
  }
};
