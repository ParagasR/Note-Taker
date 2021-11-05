const notes = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const uniqId = require('uniqid');
const fs = require('fs');





//renders the array of objects
app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})

app.post('/api/notes', (req, res) => {
    // res.json(req.body);
    const { title, text } = req.body

    if (title && text) {
        const newTask = {
            title,
            text,
            id: uniqId(),
        };

        

    } else {
        res.status(500).json('Error in posting new task')
    }
})

module.exports = notes;