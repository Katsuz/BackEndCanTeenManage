const { status } = require('./../Constant');
const { authService } = require('./../Service');

class AuthController {
    //[POST] /api/v1/auth/register
    register = async (req, res, next) => {
        try {
            //get data from client
            const { username, email, password } = req.body;
            console.log(req.body)

            const { newUser } = await authService.register(username, email, password);
            console.log(newUser);
            res.status(status.OK).json({
                message: "register succesfully",
                data: newUser,
            })
        } catch (err) {
            next(err);
        }
    }
    //[POST] /api/v1/auth/login
    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            //get accessToken and refreshToken
            const { payload, accessToken } = await authService.login(email, password);


            //res return  
            res.status(status.OK).json({
                message: 'login sucessfully',
                data: {
                    user: { ...payload },
                    accessToken
                }
            })

        } catch (err) {
            next(err);
        }
    }

    //[GET] /api/v1/auth
    CurrentProduct = async (req, res, next) => {
        try {

            const {product} = await authService.CurrentProduct();

            res.status(status.OK).json({
                message: "todayProduct",
                data: product
            });

        } catch (error) {
            next(error);
        }
    }

    //[PUT] /api/v1/auth/forgot-password

    //[POST] /api/v1/auth/forgot-password
}

module.exports = AuthController;