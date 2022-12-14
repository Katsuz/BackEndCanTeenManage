const express = require('express');
const route = express.Router();
const {PositionController} = require('../Controller');

//POST api/v1/position/setEmptyPositionCode
route.post('/setEmptyPosition', PositionController.setEmptyPositionCode);

//POST api/v1/position/getPositionTableColor
route.post('/getPositionTableColor', PositionController.getPositionTableColor);

//GET api/v1/position/getListBillUncompelte
route.post('/getListBillUncomplete', PositionController.getListBillUncomplete);

//GET api/v1/position/getListBillUncompelte
route.post('/getBillUncompleteByID', PositionController.getListBillUncompleteByID);

//POST api/v1/position/setStatusProduct
route.post('/setStatusProduct', PositionController.setStatusProduct);

module.exports = route