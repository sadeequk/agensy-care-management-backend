const express = require("express");
const router = express.Router();
const agensyFormControllers = require("../controllers/index");
// const facesheetShortFormController = require("../controllers/facesheet.short.form.controller");
// const facesheetLongFormController = require("../controllers/facesheet.long.form.controller");

//^  MEDICAL ==> Face sheet (Short)
router.get("/face-sheet-short", agensyFormControllers.facesheetShortFormController.existing_details_get);
router.post("/face-sheet-short", agensyFormControllers.facesheetShortFormController.face_sheet_short_post);

//^  MEDICAL ==> Face sheet (long)
router.get("/face-sheet-long", agensyFormControllers.facesheetLongFormController.existing_details_get);
router.post("/face-sheet-long", agensyFormControllers.facesheetLongFormController.face_sheet_log_post);

//^  MEDICAL ==> Health History
router.get("/health-history", agensyFormControllers.healthHistoryFormController.existing_details_get);
router.post("/health-history", agensyFormControllers.healthHistoryFormController.health_hitory_post);

//^ ASSESSMENT ==> Care Recipient Questionnaire
router.get("/care-recipient-questionnaire", agensyFormControllers.careRecipientQuestionnaireController.existing_details_get);
router.post("/care-recipient-questionnaire", agensyFormControllers.careRecipientQuestionnaireController.care_recipient_questionnaire_post);

//^START OF CARE ====>  start of care checklist
router.get("/start-of-care-checklist", agensyFormControllers.startOfCareChecklistController.existing_details_get);
router.post("/start-of-care-checklist", agensyFormControllers.startOfCareChecklistController.start_of_care_checklist_post);




module.exports = router;
