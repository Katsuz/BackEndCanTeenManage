const express = require('express');
const route = express.Router();
const {UserController} = require('./../Controller');
const {authorizationMDW} = require('./../Middleware');
const userController = new UserController();

route.get('/profile',authorizationMDW.checkUser,userController.getProfile);

route.post('/profile', authorizationMDW.checkUser, userController.updateProfileUser);

//route.put('/changePassword', );

//POST api/v1/user/addProperty
route.post('/addProperty',authorizationMDW.checkUser, userController.addProperty );

route.post('/changePassword', authorizationMDW.checkUser, userController.updatePasswordUser);


route.post('/logout',authorizationMDW.checkUser,userController.logout);

module.exports = route;