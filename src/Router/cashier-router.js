const express = require('express');
const route = express.Router();
const CashierController = require('./../Controller/cashier-controller');
const {authorizationMDW} = require('./../Middleware');



//POST api/v1/cashier/product 
route.post('/addProduct',authorizationMDW.checkPermission, CashierController.insertFood);

module.exports = route