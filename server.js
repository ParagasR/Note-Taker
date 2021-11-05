const express = require('express');

//allows use for __dirname & path.join
const path = require('path');

const PORT = 3001;

const app = express();
app.use(express.json());
//Middleware
app.use(express.static('public'));

//load notes.html at the address /notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

//catch all 
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

//set the port and log that the server is running
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});