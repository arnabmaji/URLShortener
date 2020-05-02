const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { UrlMapper, validate } = require('./models/UrlMapper');

const app = express();

// connect to mongodb
mongoose
    .connect('mongodb://localhost/url-shortener', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('Connected to MongoDb'))
    .catch(err => {
        console.log('Failed to connect to MongoDB');
        console.log('ERROR: ', err.message);
        console.log('Terminating Server...');
        process.exit(1);
    });

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// routes
// add home route
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