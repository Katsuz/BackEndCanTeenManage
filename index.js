// const express = require('express');
// const cors = require('cors');
// const app = express();
// const {mongoConnection} = require('./src/Database');
// const {PORT} = require('./src/Config');
// const morgan = require('morgan');
// require('dotenv').config();
// var bodyParser = require('body-parser');
// const router = require('./src/Router');


// (async()=>{
//     app.use(express.json());
//     app.use(bodyParser.urlencoded({extended: true}));
//     app.use(cors());
//     app.use(morgan("common"));


//     // connect to mongodb
//     await mongoConnection();

//     router(app);

//     const port = PORT || 5000;
//     app.listen(port, () => {
//         console.log(`Sever is running on port ${port}`);
//     })
// })()


const express = require('express');
require('dotenv').config();

const pipelineConfig = require('./express-app');

const {
    PORT
} = require('./src/Config');


(async()=>{
    const app = express();
    const port = PORT || 5000;
    
    await pipelineConfig(app);
    app.listen(port, ()=>{
        console.log(`server was running on port ${port}`);
    }).on('error', ()=>{
        console.log('something wrong with while setting up your server');
    })
})()