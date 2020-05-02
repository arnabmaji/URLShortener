const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { validate } = require('./models/UrlMapper');

const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// routes
app.get('/', (req, res) => {
    res.send('Url Shortener');
});

// add route for creating new url shortener
app.post('/', (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    res.sendStatus(200);
});

// start the server on port
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));