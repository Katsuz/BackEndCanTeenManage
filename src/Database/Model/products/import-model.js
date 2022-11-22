const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const Import = new Schema({
    productID: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    date: String,
    quantity: Number,
    totalCost: Number,
    source: String,
});

module.exports = mongoose.model('Import', Import);