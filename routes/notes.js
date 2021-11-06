const notes = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const uniqId = require('uniqid');
const fs = require('fs');

//renders the array of objects
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})

notes.post('/', (req, res) => {
    //spread the req and assign to the variables
    const { title, text } = req.body

    if (title && text) {
        //create new object to pass through the readandappend
        const newTask = {
            title,
            text,
            id: uniqId(),
        };
        //read the file and append to the current content and write back to the file
        readAndAppend(newTask, './db/db.json')

        //need to return data via response.json
        res.json(newTask)
    } else {
        res.status(500).json('Error in posting new task')
    }
})



module.exports = notes;

//issues: not going to .then after calling the fetch/post