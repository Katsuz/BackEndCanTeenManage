const express = require('express');
const route = express.Router();
const {PositionController} = require('./../Controller');
const {authorizationMDW} = require('./../Middleware');



//POST api/v1/position/createPosition
route.post('/createPosition', authorizationMDW.checkPermission, PositionController.createPositionCode);

//POST api/v1/position/setPosition
route.post('/setPosition', PositionController.setPositionCode);


module.exports = route