const HealthHistoryFormService = require("../services/health.history.form.service.js");
const joiSchemas = require("../validation/health.history.form.schemas");
const { USER_ROLES } = require("../constants");

exports.existing_details_get = async (req, res) => {
  try {
    const clientId = req.clientId;
    const details = await HealthHistoryFormService.getExistingDetails(clientId);
    return res.success(details);
  } catch (error) {
    console.error("HealthHistoryFormController [getExistingDetails] Error:", error);
    return res.serverError(error);
  }
};

exports.health_hitory_post = async (req, res) => {
  try {
    const primaryUserId = req.user.role == USER_ROLES.PRIMARY_USER ? req.user.id : req.user.primary_user_id;
    const clientId = req.clientId;
    const data = await joiSchemas.health_history_post.validateAsync(req.body);
    const result = await HealthHistoryFormService.saveOrUpdateDetails(clientId, data, primaryUserId);
    return res.success(result);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.fail(error.message);
    }
    console.error("HealthHistoryFormController [saveOrUpdateDetails] Error:", error);
    return res.serverError(error);
  }
};
