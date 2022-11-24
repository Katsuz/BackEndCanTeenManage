const express = require('express');
const route = express.Router();
const {UserController} = require('./../Controller');
const {authorizationMDW} = require('./../Middleware');
const userController = new UserController();

//GET api/v1/user/profile
route.get('/profile',authorizationMDW.checkUser,userController.getProfile);

//POST api/v1/user/profile
route.post('/profile', authorizationMDW.checkUser, userController.updateProfileUser);

//POST api/v1/user/addProperty
route.post('/addProperty',authorizationMDW.checkUser, userController.addProperty );

//POST api/v1/user/changePassword
route.post('/changePassword', authorizationMDW.checkUser, userController.updatePasswordUser);

//POST api/v1/user/createOnlineBill
route.post('/createOnlineBill',authorizationMDW.checkUser, userController.createBill);

//POST api/v1/user/confirmBill
route.post('/confirmBill',authorizationMDW.checkUser, userController.confirmBill);

//POST api/v1/user/uncompleteBill
route.get('/uncompleteBill',authorizationMDW.checkUser, userController.getUncompleteBill);

//POST api/v1/user/getHistoryBill
route.post('/getHistoryBill',authorizationMDW.checkUser, userController.getHistoryBill);

//POST api/v1/user/logout
route.post('/logout',authorizationMDW.checkUser,userController.logout);

module.exports = route;