const express = require('express');
const cors = require('cors');
//const app = express();
const {mongoConnection} = require('./src/Database');
const {PORT} = require('./src/Config');
const morgan = require('morgan');

var bodyParser = require('body-parser');
const router = require('./src/Router');


module.exports = async function(app) {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.json());
    app.use(cors());
    //app.use(morgan("common"));


    // connect to mongodb
    await mongoConnection();

    //bat loi
    router(app);

}
