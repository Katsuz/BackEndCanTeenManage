const mongoose = require('mongoose');
const {MONGO_CONNECTION_STRING} = require('./../Config');

module.exports = async function() {
    try {
        console.log(MONGO_CONNECTION_STRING)
        await mongoose.connect("mongodb://127.0.0.1:27017/canteen");
        console.log('connect to mongodb successfully!');
    } catch(err) {
        console.log('something wrong when connecting to mongodb server!');
        throw err;
    }
}