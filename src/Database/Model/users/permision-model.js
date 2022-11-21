const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const Permission = new Schema({
    name: {
        type: String,
    },
    code: {
        type: String,
    }
});

module.exports = model('permission', Permission);