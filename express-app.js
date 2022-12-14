const express = require('express');
const cors = require('cors');
//const app = express();
const {mongoConnection} = require('./src/Database');
const {PORT} = require('./src/Config');
const morgan = require('morgan');
var bodyParser = require('body-parser');
const router = require('./src/Router');

const {errorHandlingMDW} = require('./src/Middleware');
const canteenSchedule = require('./src/Schedule/index');

module.exports = async function(app) {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.json());
    app.use(cors({
        origin: '*',
        credentials: true
    }));
    
    // connect to mongodb
    await mongoConnection();

    // canteen schedule
    canteenSchedule.run();

    //Khoi tao
    router(app);
    
    //handle loi
    app.use(errorHandlingMDW.handleErrorResquest)

    
}
