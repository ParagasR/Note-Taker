const express = require('express');
const uniqId = require('uniqid');
const fs = require('fs');
const db = require('./db/db.json')
//allows use for __dirname & path.join
const path = require('path');
const e = require('express');
const PORT = 3001;

const app = express();

//Middleware
app.use(express.static('public'));

//load notes.html at the address /notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

//renders the array of objects
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if(err) {
            console.log(err)
        } else {
            res.json(JSON.parse(data))
        }
    })
    
})

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body

    if (title && text) {
        const newTask = {
            title,
            text,
            id: uniqId(),
        };

        const writeToFile = (sendingData) => {
            fs.writeFile('./db/db.json', sendingData, (err) => {
                err ? res.status(500).json('Error in writing data to db.json') : console.log(`${newTask.title} has been added to task list.`)
            })
        }

        fs.readFile('./db/db.json', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).json('Error in retrieving data from db.json');
            } else {
                JSON.parse(data).push(newTask);
                writeToFile(data);
            }
        })
    } else {
        res.status(500).json('Error in posting new task')
    }
})

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

//set the port and log that the server is running
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});