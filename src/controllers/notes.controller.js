const notesCtrl = {};

const NoteModel = require("../models/Note");

notesCtrl.getNotes = (req, res) => {
    NoteModel.find((err, notes) => {
        res.json(notes);
    });
};

notesCtrl.createNote = async(req, res) => {
    const { title, content, date, author } = req.body;
    const newNote = new NoteModel({
        title,
        content,
        date,
        author,
    });
    try {
        await newNote.save();
        res.json({ message: "Note Saved" });
    } catch (err) {
        res.json({ message: err._message || "Error" });
    }
};

notesCtrl.getNote = (req, res) => {
    NoteModel.findById(req.params.id, (err, note) => {
        // res.json(note)
        if (err) {
            res.json({});
        } else {
            res.json(note);
        }
    });
};
notesCtrl.updateNote = async(req, res) => {
    const { title, content, author } = req.body;
    await NoteModel.findOneAndUpdate({ _id: req.params.id }, {
        title,
        content,
        author,
    });
    res.json({ message: "Note Updated" });
};

notesCtrl.deleteNote = (req, res) => {
    NoteModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            res.json({ message: err });
        } else {
            res.json({ message: "Note Deleted" });
        }
    });
};

module.exports = notesCtrl;