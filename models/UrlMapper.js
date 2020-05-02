const mongoose = require('mongoose');
const Joi = require('joi');

// schema for mapper
const mapperSchema = new mongoose.Schema({
    key : {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 32
    },
    url: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// create model
const UrlMapper = mongoose.model('Mapper', mapperSchema);

// create schema for validating url mapper objects
function validate(mapper) {
    const schema = {
        key: Joi.string().min(4).max(32).required(),
        url: Joi.string().required().uri()
    }
    return Joi.validate(mapper, schema);
}

// exports
module.exports.UrlMapper = UrlMapper;
module.exports.validate = validate;
