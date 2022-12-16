const express = require('express');
const route = express.Router();
const {AuthController} = require('./../Controller');
const authController = new AuthController();

route.post('/register', authController.register);

route.post('/login', authController.login);

route.post('/forgotPassword', authController.forgotPassword);

route.get('/', authController.CurrentProduct);

module.exports = route;