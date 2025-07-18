const express = require("express");
const router = express.Router();
const noteController = require("../controllers/note.controller");

router.post("/", noteController.note_post);
router.get("/", noteController.notes_get);
router.get("/:noteId", noteController.note_get);
router.put("/:noteId", noteController.note_put);
router.delete("/:noteId", noteController.note_delete);

module.exports = router;
