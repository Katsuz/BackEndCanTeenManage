const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const OnSell = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  quantity: Number
});

module.exports = mongoose.model('Onsell', OnSell);