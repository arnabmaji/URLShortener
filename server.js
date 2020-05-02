const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
// middleware
app.use(bodyParser.urlencoded({extended: true}));

// routes
app.get('/', (req, res) => {
    res.send('Url Shortener');
});

// start the server on port
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));