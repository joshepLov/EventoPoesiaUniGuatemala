'use strict'

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    carne: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    address: {
        type: String,
        required: true,
        lowercase: true
    },
    gender:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    birthdate:{
        type: Date,
        required: true
    },
    specialty:{
        type: String,
        required: true
    },
    genrePoetry:{
        type: String,
        required: true
    },
    registrationDate:{
        type: Date,
        required: true
    },
    reportDate:{
        type: Date,
        required: true
    },
    role:{
        type:String,
        uniqued: true
    }
});

module.exports = mongoose.model('User', userSchema);

