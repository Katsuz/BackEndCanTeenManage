const express = require('express');
const route = express.Router();
const {AuthController} = require('./../Controller');
const authController = new AuthController();

route.post('/register', authController.register);

route.post('/login', authController.login);


route.get('/', authController.CurrentProduct);
//route.post('/forgotPassword', );

//route.put('/forgotPassword', );

//route.get('/', );

module.exports = route;