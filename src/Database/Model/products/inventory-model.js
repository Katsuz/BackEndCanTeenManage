const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const Inventory = new Schema({
    productID: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: Number
});

module.exports = mongoose.model('Inventory', Inventory);