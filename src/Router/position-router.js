const express = require('express');
const route = express.Router();
const {PositionController} = require('./../Controller');
const {authorizationMDW} = require('./../Middleware');



//POST api/v1/position/createPosition
route.post('/createPosition', authorizationMDW.checkPermission, PositionController.createPositionCode);

//POST api/v1/position/setEmptyPositionCode
route.post('/setEmptyPosition', authorizationMDW.checkPermission, PositionController.setEmptyPositionCode);

//POST api/v1/position/getPositionTableColor
route.post('/getPositionTableColor', PositionController.getPositionTableColor);

//GET api/v1/position/getListBillUncompelte
route.get('/getListBillUncompelte', PositionController.getListBillUncomplete);

//POST api/v1/position/setStatusProduct
route.post('/setStatusProduct', PositionController.setStatusProduct)

module.exports = route