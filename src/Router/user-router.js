const express = require('express');
const route = express.Router();
const {UserController} = require('./../Controller');
const {authorizationMDW} = require('./../Middleware');
const userController = new UserController();

//route.get('/changeProfile', );

//route.put('/changeProfile', );

//route.put('/changePassword', );

//route.post('/changePassword', );

route.post('/logout',authorizationMDW.checkUser,userController.logout);

module.exports = route;