//Import express
const express = require('express');
//import notes.js file
const notesRouter = require('./notes');
//initialize express to app variable
const app = express();
//connect index to the /notes path to the notes.js
app.use('/notes', notesRouter);
//export app to main file
module.exports = app;