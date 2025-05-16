const clientService = require("../services/client.service");
const { ClientNote } = require("../models");
const joiSchemas = require("../validation/note.schemas");

exports.note_post = async (req, res) => {
  try {
    const { id } = req.params;
    const noteData = await joiSchemas.note_post.validateAsync(req.body);

    const client = await clientService.getClientWithAccessCheck(req.user.id, id);
    if (!client) {
      return res.fail("Client not found or you don't have permission to add notes");
    }

    // doesnot add  addClient not cox the reation is not amany to many
    const note = await ClientNote.create({ ...noteData, client_id: id });

    return res.success(note);
  } catch (error) {
    if (error.message === "Client not found or user doesn't have access") {
      return res.fail(error.message);
    }
    if (error.name === "ValidationError") {
      return res.fail(error.message);
    }
    console.error("NoteController [notes_post] Error:", error);
    return res.serverError(error);
  }
};

exports.note_get = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await ClientNote.findByPk(id);
    if (!note) {
      return res.fail("Note not found");
    }
    return res.success(note);
  } catch (error) {
    console.error("NoteController [note_get] Error:", error);
    return res.serverError(error);
  }
};

exports.notes_get = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await clientService.getClientById(id);
    if (!client) {
      return res.fail("Client not found");
    }
    const notes = await client.getClientNotes();
    return res.success(notes);
  } catch (error) {
    console.error("NoteController [notes_get] Error:", error);
    return res.serverError(error);
  }
};

exports.note_put = async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = await joiSchemas.note_put.validateAsync(req.body);

    const note = await ClientNote.findByPk(id);
    if (!note) {
      return res.fail("Note not found");
    }

    await note.update(validatedData);
    return res.success(note);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.fail(error.message);
    }
    console.error("NoteController [note_put] Error:", error);
    return res.serverError(error);
  }
};

exports.note_delete = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await ClientNote.findByPk(id);
    if (!note) {
      return res.fail("Note not found");
    }

    await note.destroy();
    return res.success({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("NoteController [note_delete] Error:", error);
    return res.serverError(error);
  }
};
