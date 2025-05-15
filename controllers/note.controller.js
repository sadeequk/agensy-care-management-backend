const noteService = require("../services/note.service");
const joiSchemas = require("../validation/note.schemas");

exports.note_post = async (req, res) => {
  try {
    const results = await joiSchemas.note_post.validateAsync(req.body);
    const note = await noteService.createNote(req.user.id, req.params.id, results.text);
    return res.success(note);
  } catch (error) {
    console.error("NoteController [notes_post] Error:", error);
    return res.serverError(error);
  }
};

exports.note_get = async (req, res) => {
  try {
    const note = await noteService.getNote(req.user.id, req.params.id, req.params.clientId);
    return res.success(note);
  } catch (error) {
    console.error("NoteController [note_get] Error:", error);
    return res.serverError(error);
  }
};

exports.notes_get = async (req, res) => {
  try {
    const notes = await noteService.getNotesForClient(req.user.id, req.params.id);
    return res.success(notes);
  } catch (error) {
    console.error("NoteController [notes_get] Error:", error);
    return res.serverError(error);
  }
};

exports.note_put = async (req, res) => {
  try {
    const results = await joiSchemas.note_put.validateAsync(req.body);
    const note = await noteService.updateNote(req.user.id, req.params.id, results.text);
    return res.success(note);
  } catch (error) {
    console.error("NoteController [note_put] Error:", error);
    return res.serverError(error);
  }
};

exports.note_delete = async (req, res) => {
  try {
    await noteService.deleteNote(req.user.id, req.params.id);
    return res.success({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("NoteController [note_delete] Error:", error);
    return res.serverError(error);
  }
};
