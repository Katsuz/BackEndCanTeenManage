const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const Export = new Schema({
    productID: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    time: String,
    quantity: Number
});

module.exports = mongoose.model('Export', Export);