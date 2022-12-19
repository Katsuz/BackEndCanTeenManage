const express = require('express');
const route = express.Router();
const {CashierController} = require('./../Controller');
const {PositionController} = require('./../Controller');

//POST api/v1/cashier/createBill
route.post('/createBill', CashierController.createBill);

//POST api/v1/cashier/product 
route.post('/addProduct', CashierController.insertFood);

//POST api/v1/cashier/importGoods
route.post('/importGoods' , CashierController.importGoods);

//POST api/v1/cashier/importHistory
route.post('/importHistory',CashierController.importHistory);

//POST api/v1/cashier/inventory
route.post('/inventory',CashierController.currentInventory);

//POST api/v1/cashier/removeGood
route.post('/removeGood',CashierController.removeGood);

//POST api/v1/cashier/exportGoods
route.post('/exportGoods', CashierController.exportGoods);

//POST api/v1/cashier/exportHistory
route.post('/exportHistory', CashierController.exportHistory);

//POST api/v1/cashier/getUnCompletedBill
route.post('/getUnCompletedBill', CashierController.getUnCompletedBill);

//POST api/v1/cashier/getCompletedBill
route.post('/getCompletedBill', CashierController.getCompletedBill);

//POST api/v1/cashier/getTodayRevenue
route.post('/getTodayRevenue', CashierController.getTodayRevenue);

//POST api/v1/cashier/getMonthRevenue
route.post('/getMonthRevenue', CashierController.getMonthRevenue);

//POST api/v1/cashier/getRevenueInPeriodTime
route.post('/getRevenueInPeriodTime', CashierController.getRevenueInPeriodTime);

//POST api/v1/cashier/createPosition
route.post('/createPosition', PositionController.createPositionCode);

//POST api/v1/cashier/getBillByID
route.post('/getBillByID', CashierController.getBillByID);

//POST api/v1/cashier/getHistoryBillByID
route.post('/getHistoryBillByID', CashierController.getHistoryBillByID);

//POST api/v1/cashier/getBillByDate
route.post('/getBillByDate', CashierController.getBillByDate);

//POST api/v1/cashier/allProduct
route.post('/allProduct', CashierController.getAllProduct);
//POST api/v1/cashier/createCode
//route.post('/createCode',  , CashierController.createCode );

module.exports = route