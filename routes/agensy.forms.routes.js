const express = require("express");
const router = express.Router();
const agensyFormControllers = require("../controllers/index");


//^  MEDICAL ==> Face sheet (Short)
router.get("/face-sheet-short", agensyFormControllers.facesheetShortFormController.existing_details_get);
router.post("/face-sheet-short", agensyFormControllers.facesheetShortFormController.face_sheet_short_post);

//^  MEDICAL ==> Face sheet (long)
router.get("/face-sheet-long", agensyFormControllers.facesheetLongFormController.existing_details_get);
router.post("/face-sheet-long", agensyFormControllers.facesheetLongFormController.face_sheet_log_post);

//^  MEDICAL ==> Health History
router.get("/health-history", agensyFormControllers.healthHistoryFormController.existing_details_get);
router.post("/health-history", agensyFormControllers.healthHistoryFormController.health_history_post);

//^ ASSESSMENT ==> Care Recipient Questionnaire
router.get("/care-recipient-questionnaire", agensyFormControllers.careRecipientQuestionnaireController.existing_details_get);
router.post("/care-recipient-questionnaire", agensyFormControllers.careRecipientQuestionnaireController.care_recipient_questionnaire_post);

//^CHECKLISTS
router.get("/checklists/:formType", agensyFormControllers.checkListController.existing_details_get);
router.post("/checklists/:formType", agensyFormControllers.checkListController.checklist_post);

router.get("/essential-documents", agensyFormControllers.essentialDocumentController.existing_details_get);
router.post("/essential-documents", agensyFormControllers.essentialDocumentController.essential_document_post);

//^ Caregiver Information Sheet
router.get("/caregiver-information-sheet", agensyFormControllers.caregiverInformationSheetController.existing_details_get);
router.post("/caregiver-information-sheet", agensyFormControllers.caregiverInformationSheetController.caregiver_information_sheet_post);

//^ MEDICAL ==> Medical Template
router.get("/medical-template", agensyFormControllers.medicalTemplateController.existing_details_get);
router.post("/medical-template", agensyFormControllers.medicalTemplateController.medical_template_post);



module.exports = router;
