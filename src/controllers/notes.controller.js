const notesCtrl = {};

const mu = require("../db/MongoUtils");

notesCtrl.getNotes = (req, res) => {
  mu.getNotes().then((notes) => {
    console.log(notes);
    res.json(notes);
  });
};

notesCtrl.createNote = async (req, res) => {
  console.log("params", req.body);
  const note = {
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
    author: req.body.author,
  };
  mu.createNote(note).then(res.json({ message: "User Saved" }));
};

notesCtrl.getNote = (req, res) => {
  mu.getNote(req.params.id).then((note) => res.json(note));
};

notesCtrl.updateNote = async (req, res) => {
  console.log("params", req.body);
  const note = {
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
    author: req.body.author,
  };
  mu.updateNote(req.params.id, note);
  res.json({ message: "Note Updated" });
};

notesCtrl.deleteNote = (req, res) => {
  mu.deleteNote(req.params.id);
  res.json({ message: "User Deleted" });
};

module.exports = notesCtrl;
