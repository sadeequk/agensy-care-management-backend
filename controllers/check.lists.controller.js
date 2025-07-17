const checkListService = require("../services/check.lists.service");
const { USER_ROLES } = require("../constants");
const formHistoryService = require("../services/form.history.service");
const joiSchemas = require("../validation/check.list.schemas");

exports.existing_details_get = async (req, res) => {
  try {
    const clientId = req.clientId;
    const validatedFormType = await joiSchemas.form_type.validateAsync(req.params.formType);
    const details = await checkListService.getExistingDetails(clientId, validatedFormType);
    return res.success(details);
  } catch (error) {
    console.error("StartOfCareChecklistController [existing_details_get] Error:", error);
    return res.serverError(error);
  }
};

exports.checklist_post = async (req, res) => {
  try {
    const userId = req.user.id;
    const clientId = req.clientId;
    const data = req.body;

    const validatedFormType = await joiSchemas.form_type.validateAsync(req.params.formType);
    const primaryUserId = req.user.role == USER_ROLES.PRIMARY_USER ? req.user.id : req.user.primary_user_id;
    const record = await checkListService.saveOrUpdateDetails(clientId, primaryUserId, validatedFormType, data);


    await formHistoryService.recordFormUpdate(clientId, userId, primaryUserId, validatedFormType);//here the form type is basiclly the CHECKLIST_TYPE
    return res.success(record);
  } catch (error) {
    console.error("StartOfCareChecklistController [start_of_care_checklist_post] Error:", error);
    return res.serverError(error);
  }
}; 