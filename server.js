const express = require('express');
const uniqId = require('uniqid');
const fs = require('fs');

//allows use for __dirname & path.join
const path = require('path');

const PORT = 3001;

const app = express();

app.use(express.static('public'));

//set the port and log that the server is running
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});