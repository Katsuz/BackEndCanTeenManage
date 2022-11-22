const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const Position = new Schema({
    idPosition: String,
    status: Boolean,
    letter: String,
    number: Number,
    color: String
});

module.exports = mongoose.model('Position', Position);