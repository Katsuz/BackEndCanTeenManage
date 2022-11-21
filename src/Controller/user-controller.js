const {status} = require('./../Constant');
const {userService} = require('./../Service');

class UserController {
    logout = async(req,res,next) => {
        try{
            const {_id} = req.user;
            await userService.logout(_id);
            res.status(status.OK).json({
                message: 'logout sucessfully',
                data: null
            });
        } catch (err) {
            next(err);
        }
    }


}

module.exports = UserController;