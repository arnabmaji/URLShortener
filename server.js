const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');
const { UrlMapper, validate } = require('./models/UrlMapper');

const app = express();

// connect to mongodb
console.log('Connecting to MongoDB...');
mongoose
    .connect('mongodb://localhost/url-shortener', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.log('Failed to connect to MongoDB');
        console.log('ERROR: ', err.message);
        console.log('Terminating Server...');
        process.exit(1);
    });

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// routes
// add home route
app.get('/', (req, res) => {
    res.status(200).send('Url Shortener');
});

// add route for creating new url shortener
app.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if key already exists
    let mapper = await UrlMapper.findOne({ key: req.body.key });

    // if key already exists
    if (mapper) return res.status(400).send('Key already taken.');

    //otherwise, create new mapper in db
    mapper = new UrlMapper(_.pick(req.body, ['key', 'url']));
    await mapper.save();
    res.sendStatus(200);
});

// add route for redirecting pages according to keys
app.get('/get/:key', async (req, res) => {
    const mapper = await UrlMapper.findOne({ key: req.params.key });

    // if mapper is not found
    if (!mapper) return res.render('not-found', { key: req.params.key });

    // otherwise, redirect to url
    res.redirect(mapper.url);
})

// start the server on port
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));