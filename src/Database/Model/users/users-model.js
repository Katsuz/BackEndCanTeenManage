const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const User = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: String,

    IdUser: String,

    property: {
        type: Number,
        default: 0
    },

    status: {
        type: Boolean,
        default: false
    },

    roleID: {
            type: Schema.Types.ObjectId,
            ref: 'role',
    },
});

module.exports = model('user',User);