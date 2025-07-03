const express = require("express");
const router = express.Router();

const facesheetShortFormController = require("../controllers/facesheet.short.form.controller");

router.get("/face-sheet-short", facesheetShortFormController.existing_details_get);
router.post("/face-sheet-short", facesheetShortFormController.face_sheet_short_post);

module.exports = router;
