const express = require('express');
const route = express.Router();
const {CashierController} = require('./../Controller');
const {authorizationMDW} = require('./../Middleware');

//POST api/v1/cashier/createBill
route.post('/createBill',authorizationMDW.checkPermission, CashierController.createBill);

//POST api/v1/cashier/product 
route.post('/addProduct',authorizationMDW.checkPermission, CashierController.insertFood);

//POST api/v1/cashier/importGoods
route.post('/importGoods',authorizationMDW.checkPermission, CashierController.importGoods);

//POST api/v1/cashier/importHistory
route.post('/importHistory', CashierController.importHistory);

//POST api/v1/cashier/inventory
route.post('/inventory', CashierController.currentInventory);

//POST api/v1/cashier/exportGoods
route.post('/exportGoods', authorizationMDW.checkPermission, CashierController.exportGoods);

//POST api/v1/cashier/exportHistory
route.post('/exportHistory', CashierController.exportHistory);

module.exports = route