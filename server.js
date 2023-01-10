const express = require('express');

// const fs = require('fs');
// const util = require('util');
const apiRoutes = require('./routes/api-routes');
const htmlRoutes = require('./routes/html-routes');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/', apiRoutes);
app.use('/', htmlRoutes);

// UTILIZE FS FOR API ROUTES
// Promise version of fs.readFile

app.listen(PORT, () =>
  console.log(`Listening at http://localhost:${PORT}`)
);
