const authRouter = require('./auth-router');
const userRouter = require('./user-router');
const cashierRouter = require('./cashier-router');
const positionRouter = require('./position-router')

module.exports = function(app) {
    app.use('/api/v1/position', positionRouter);

    app.use('/api/v1/auth',authRouter);
    
    app.use('/api/v1/user',userRouter);

    app.use('/api/v1/cashier', cashierRouter)
}