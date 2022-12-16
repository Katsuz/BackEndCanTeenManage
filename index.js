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