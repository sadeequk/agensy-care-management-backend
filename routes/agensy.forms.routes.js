const express = require("express");
const router = express.Router();

const facesheetShortFormController = require("../controllers/facesheet.short.form.controller");
const facesheetLongFormController = require("../controllers/facesheet.long.form.controller");

// Face sheet (Short)
router.get("/face-sheet-short", facesheetShortFormController.existing_details_get);
router.post("/face-sheet-short", facesheetShortFormController.face_sheet_short_post);

// Face sheet (long)
router.get("/face-sheet-long", facesheetLongFormController.existing_details_get);
router.post("/face-sheet-long", facesheetLongFormController.face_sheet_log_post);

module.exports = router;
