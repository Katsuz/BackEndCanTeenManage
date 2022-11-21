const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const Role = new Schema({
    name: {
        type: String,
        enum: ['user', 'cashier', 'assistant']
    },
    permissions: [{
        ref: 'permission',
        type: Schema.Types.ObjectId
    }]
});

module.exports = model('role', Role);