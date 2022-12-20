const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = 3001;

const app = express();

const newNote = require('./db/db.json');


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));


app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './index.html'))
);

app.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, './notes.html'))
);

app.get('/api/notes', (req, res) => {
  res.json(newNote);
  });

  // // readfromfile and res.json the data
  // readFile('./db/db.json').then((newNote) => 
  //   res.json(JSON.parse(newNote))
  // )
  
  // UTILIZE FS FOR API ROUTES
app.get('/api/notes', (req, res) => {
  res.json(newNote);
})

app.post('/api/notes', (req, res) => {
  res.json(newNote);
  // readandappend and res.json the note
});

app.listen(PORT, () =>
console.log(`Listening at http://localhost:${PORT}`)
);