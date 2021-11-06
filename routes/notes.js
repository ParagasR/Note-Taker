const notes = require('express').Router();
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
const uniqId = require('uniqid');
const fs = require('fs');
const { stringify } = require('querystring');

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

notes.delete('/:id', (req, res) => {
    // console.log(req.params)

    const { id } = req.params;
    
    readFromFile('./db/db.json').then((data) => {
        // console.log(JSON.parse(data))
        data = JSON.parse(data)
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id){
                data.splice(i, 1)
                writeToFile('./db/db.json', data)
                
            }
        }
        res.json(data)
    })
})

module.exports = notes;