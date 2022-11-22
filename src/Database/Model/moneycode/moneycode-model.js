const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const MoneyCode = new Schema({
    code: String,
    price: Number
});

module.exports = mongoose.model('moneycode', MoneyCode);