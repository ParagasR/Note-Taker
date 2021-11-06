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
    //spread the parameters by id
    const { id } = req.params;
    
    //read the databases infor
    readFromFile('./db/db.json').then((data) => {
        // just parsing the data once to be used
        data = JSON.parse(data)
        // find the index that matches the parameter
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id){
                //remove the data from the array
                data.splice(i, 1)
                //rewrite the data back to the .json file
                writeToFile('./db/db.json', data)
            }
        }
        //send the response back
        res.json(data)
    })
})

module.exports = notes;