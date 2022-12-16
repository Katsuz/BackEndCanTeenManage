const authRouter = require('./auth-router');
const userRouter = require('./user-router');
const cashierRouter = require('./cashier-router');
const positionRouter = require('./assistant-router')
const {authorizationMDW} = require('./../Middleware');

module.exports = function(app) {

    app.use('/api/v1/auth',authRouter);
    
    app.use('/api/v1/user', authorizationMDW.checkUser,userRouter);

    app.use('/api/v1/position', authorizationMDW.checkPermission,positionRouter);

    app.use('/api/v1/cashier', authorizationMDW.checkPermission, cashierRouter);
    
}