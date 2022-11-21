const authRouter = require('./auth-router');
const userRouter = require('./user-router');


module.exports = function(app) {
    app.use('/api/v1/auth',authRouter);
    
    app.use('/api/v1/user',userRouter);
}