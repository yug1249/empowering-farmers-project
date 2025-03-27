// models/Climate.js
const mongoose = require('mongoose');

const ClimateSchema = new mongoose.Schema({
    state: {
        type: String,
        required: true,
        unique: true,
    },
    temperature: {
        type: Number,
        required: true,
    },
    rainfall: {
        type: Number,
        required: true,
    },
    humidity: {
        type: Number,
        required: true,
    },
    windSpeed: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Climate', ClimateSchema);