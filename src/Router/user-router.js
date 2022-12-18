const express = require('express');
const route = express.Router();
const {UserController} = require('./../Controller');
const {authorizationMDW} = require('./../Middleware');
const userController = new UserController();

//GET api/v1/user/profile
route.get('/profile', userController.getProfile);

//POST api/v1/user/profile
route.post('/profile',  userController.updateProfileUser);

//POST api/v1/user/addProperty
route.post('/addProperty', userController.addProperty );

//POST api/v1/user/changePassword
route.post('/changePassword', userController.updatePasswordUser);

//POST api/v1/user/createOnlineBill
route.post('/createOnlineBill', userController.createBill);

//POST api/v1/user/confirmBill
route.post('/confirmBill', userController.confirmBill);

//POST api/v1/user/uncompleteBill
route.post('/uncompleteBill', userController.getUncompleteBill);

//POST api/v1/user/getHistoryBill
route.post('/getHistoryBill', userController.getHistoryBill);

//POST api/v1/user/logout
route.post('/logout', userController.logout);

module.exports = route;