const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const Bill = new Schema({
    idBill: String,
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    idProducts: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    }],
    idPositions: [{
        type: Schema.Types.ObjectId,
        ref: 'Position',
    }],
    statusProducts: [String],
    quantity: [Number],
    typeBill: String,
    paymentStatus: String,
    time: String
});

module.exports = mongoose.model('Bill', Bill);