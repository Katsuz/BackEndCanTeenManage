const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const Bill = new Schema({
    idBill: String,
    idUser: String,
    idGood: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    }],
    idPosition: [{
        type: Schema.Types.ObjectId,
        ref: 'Position',
    }],
    statusComplete: [String],
    quantity: [Number],
    typeBill: String,
    time: Date
});

module.exports = mongoose.model('Bill', Bill);