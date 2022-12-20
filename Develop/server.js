const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json');

const PORT = 3001;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/notes.html'))
);


app.get('/api/notes', (req, res) => {
  console.info(`get /api/notes`);
  res.status(200).json(notes);
});


app.get('/api/notes', (req, res) => {
  res.json(notes);
});


// UTILIZE FS FOR API ROUTES

app.post('/api/notes', (req, res) => {
  res.json(notes);
  
  
  fs.readFile('/.db/db.json', 'utf8', (err, notes) => {
    if (err) {
      console.log(err);
    } else {
      const parsedNotes = JSON.parse(notes);

      parsedNotes.push(newNote);

      const noteString = JSON.stringify(parsedNotes);

      fs.writeFile(`./db/db.json`, JSON.stringify(parsedNotes, null, 4),
      (err) =>
        err
          ? console.error(err)
          : console.log(
            `Successfully updated notes`
          )
      );
    };
  });

  const response = {
    status: 'success',
    body: newNote,
  };

  console.log(response)
  res.status(201).json(response)
} else {
  res.status(500).json('Error in posting note'),
});


app.listen(PORT, () =>
  console.log(`Listening at http://localhost:${PORT}`)
);