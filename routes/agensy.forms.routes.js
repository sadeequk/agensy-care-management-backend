const express = require('express');
const router = express.Router();
const agensyFormControllers = require('../controllers/index');

router.get('/face-sheet-short', agensyFormControllers.facesheetShortFormController.existing_details_get);
router.post('/face-sheet-short', agensyFormControllers.facesheetShortFormController.face_sheet_short_post);

router.get('/face-sheet-long', agensyFormControllers.facesheetLongFormController.existing_details_get);
router.post('/face-sheet-long', agensyFormControllers.facesheetLongFormController.face_sheet_log_post);

router.get('/health-history', agensyFormControllers.healthHistoryFormController.existing_details_get);
router.post('/health-history', agensyFormControllers.healthHistoryFormController.health_history_post);

router.get('/care-recipient-questionnaire', agensyFormControllers.careRecipientQuestionnaireController.existing_details_get);
router.post('/care-recipient-questionnaire', agensyFormControllers.careRecipientQuestionnaireController.care_recipient_questionnaire_post);

router.get('/essential-documents', agensyFormControllers.essentialDocumentController.existing_details_get);
router.post('/essential-documents', agensyFormControllers.essentialDocumentController.essential_document_post);

router.get('/caregiver-information-sheet', agensyFormControllers.caregiverInformationSheetController.existing_details_get);
router.post('/caregiver-information-sheet', agensyFormControllers.caregiverInformationSheetController.caregiver_information_sheet_post);

router.get('/medical-template', agensyFormControllers.medicalTemplateController.existing_details_get);
router.post('/medical-template', agensyFormControllers.medicalTemplateController.medical_template_post);

router.get('/initial-care-plan-assessment', agensyFormControllers.initialCarePlanAssessmentController.existing_details_get);
router.post('/initial-care-plan-assessment', agensyFormControllers.initialCarePlanAssessmentController.initial_care_plan_assessment_post);

router.get('/comprehensive-care-plan-assessment', agensyFormControllers.comprehensiveCarePlanAssessmentController.existing_details_get);
router.post(
  '/comprehensive-care-plan-assessment',
  agensyFormControllers.comprehensiveCarePlanAssessmentController.comprehensive_care_plan_assessment_post
);

//^CHECKLISTS
router.get('/checklists/:formType', agensyFormControllers.checkListController.existing_details_get);
router.post('/checklists/:formType', agensyFormControllers.checkListController.checklist_post);

module.exports = router;
