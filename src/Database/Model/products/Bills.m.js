const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const Bill = new Schema({
    idBill: String,
    idUser: String,
    idGood: [String],
    idPosition: [String],
    status: [String],
    quantity: [Number],
    time: Date
});

module.exports = mongoose.model('Bill', Bill);