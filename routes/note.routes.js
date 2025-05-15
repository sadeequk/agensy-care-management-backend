const express = require("express");
const router = express.Router();
const noteController = require("../controllers/note.controller");
const verifyCognitoToken = require("../middlewares/auth.mw");

router.post("/:id", verifyCognitoToken, noteController.note_post); //client id
router.get("/:id", verifyCognitoToken, noteController.notes_get); //client id
router.get("/:clientId/:id", verifyCognitoToken, noteController.note_get); //clientId and noteId
router.put("/:id", verifyCognitoToken, noteController.note_put); //note id
router.delete("/:id", verifyCognitoToken, noteController.note_delete); //note id

module.exports = router;
