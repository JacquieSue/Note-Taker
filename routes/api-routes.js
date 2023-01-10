const path = require("path");
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const app = require("express").Router();

// GET Route for retrieving all the notes
app.get("/api/notes", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile("./db/db.json").then((notes) => res.json(JSON.parse(notes)));
});

// POST Route for a new note
app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
    };

    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.error(`Error in adding note`);
  }
});

module.exports = app;
