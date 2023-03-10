const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all the notes: GET '/api/notes/fetchallnotes'. Login Required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a new note: POST '/api/notes/addnote'. Login Required
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least of length 5").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // If error occurs, then return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.send(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Update an exisiting note: PUT '/api/notes/updatenote'. Login Required
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    // Create a new note
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
    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    // Allow the user to update the note if he owns it
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Authorized to update");
    }
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4: Delete an exisiting note: DELETE '/api/notes/deletenote'. Login Required
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    // Allow the user to update the note if he owns it
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Authorized to update");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note ha been deleted", note: note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
