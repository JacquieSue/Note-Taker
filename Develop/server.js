const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');

const PORT = 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET Route for homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/notes.html'))
);


// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.console.info(`\nData written to ${destination}`)
  );

const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, notes) => {
    if (err) {
      console.error(err);
    } else {
      const parsedNotes = JSON.parse(notes);
      parsedNotes.push(content);
      writeToFile(file, parsedNotes);
    }
  });
};

// UTILIZE FS FOR API ROUTES
// GET Route for retrieving all the notes
app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((notes) => res.json(JSON.parse(notes)));
});

// POST Route for a new note
app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
    };

    readAndAppend(newNote, '.db/db.json');
    
    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.error(`Error in adding note`);
  }
});

app.listen(PORT, () =>
  console.log(`Listening at http://localhost:${PORT}`)
);
