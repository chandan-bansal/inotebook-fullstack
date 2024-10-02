const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
//Route1: Get all the notes: GET /api/notes/fetchallnotes. Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

//Route2: Add new notes: POST /api/notes/addnote. Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Please enter a valid title").isLength({ min: 5 }),
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route 3: Update an existing note using: PUT "/api/notes/updatenote", Login required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  //Create new note object
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Find note to be updated

    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(400).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

//Route 4: Delete an existing note using: Delete "/api/notes/deletenote/:id", Login required

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  //Find note to be deleted
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(400).send("Not Found");
    }
    //Do not alow deletion if user is not verfied
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);

    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
