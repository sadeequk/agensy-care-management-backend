const { ClientNote, Client } = require("../models");

module.exports.createNote = (userId, clientId, text) =>
  new Promise(async (resolve, reject) => {
    try {
      const client = await Client.findOne({ where: { id: clientId, primary_user_id: userId } });
      if (!client) return reject(new Error("Client not found or does not belong to you."));
      const note = await Note.create({ text, client_id: clientId, user_id: userId });
      resolve(note);
    } catch (error) {
      console.error("NoteService [createNote] Error:", error);
      reject(error);
    }
  });

module.exports.getNote = (userId, noteId, clientId) =>
  new Promise(async (resolve, reject) => {
    try {
      const client = await Client.findOne({
        where: {
          id: clientId,
          primary_user_id: userId,
        },
      });

      if (!client) {
        return reject(new Error("Client not found or does not belong to you."));
      }

      const note = await Note.findOne({
        where: {
          id: noteId,
          client_id: clientId,
        },
      });

      if (!note) {
        return reject(new Error("Note not found"));
      }

      if (note.user_id !== userId && client.primary_user_id !== userId) {
        return reject(new Error("You do not have permission to view this note."));
      }

      resolve(note);
    } catch (error) {
      console.error("NoteService [getNote] Error:", error);
      if (error.name === "SequelizeDatabaseError") {
        reject(new Error("Error occurred while retrieving the note."));
      } else {
        reject(error);
      }
    }
  });

module.exports.getNotesForClient = (userId, clientId) =>
  new Promise(async (resolve, reject) => {
    try {
      const client = await Client.findOne({ where: { id: clientId, primary_user_id: userId } });
      if (!client) return reject(new Error("You do not have permission to view notes for this client."));
      const notes = await Note.findAll({
        where: { client_id: clientId },
        order: [["updated_at", "DESC"]],
      });
      resolve(notes);
    } catch (error) {
      console.error("NoteService [getNotesForClient] Error:", error);
      reject(error);
    }
  });

module.exports.updateNote = (userId, noteId, text) =>
  new Promise(async (resolve, reject) => {
    try {
      const note = await Note.findByPk(noteId);
      if (!note) return reject(new Error("Note not found"));
      if (note.user_id !== userId) return reject(new Error("You do not have permission to edit this note."));
      note.text = text;
      note.is_edited = true;
      await note.save();
      resolve(note);
    } catch (error) {
      console.error("NoteService [updateNote] Error:", error);
      reject(error);
    }
  });

module.exports.deleteNote = (userId, noteId) =>
  new Promise(async (resolve, reject) => {
    try {
      const note = await Note.findByPk(noteId);
      if (!note) return reject(new Error("Note not found"));
      if (note.user_id !== userId) return reject(new Error("You do not have permission to delete this note."));
      await note.destroy();
      resolve(true);
    } catch (error) {
      console.error("NoteService [deleteNote] Error:", error);
      reject(error);
    }
  });
