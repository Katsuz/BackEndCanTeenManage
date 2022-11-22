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
    };

    getProfile = async(req,res,next) => {
        try{
            const {_id} = req.user;
            const {userInfo} = await userService.getProfile(_id);

            res.status(status.OK).json({
                message: 'get profile user successfuly',
                data: userInfo,
            })
        } catch(err) {
            next(err);
        }
    };

    updateProfileUser = async(req,res,next) => {
        try{
            const {_id} = req.user;
            const {username} = req.body;
            const {user} = await userService.updateProfileUser(_id,username);

            res.status(status.OK).json({
                message: 'change profile user successfuly',
                data: user,
            })
        } catch(err) {
            next(err);
        }
    };

    updatePasswordUser = async(req,res,next) => {
        try{
            const {_id} = req.user;
            const {confirmPassword, newPassword} = req.body;
            const {userUpdated} = await userService.updatePasswordUser(_id,confirmPassword, newPassword);

            res.status(status.OK).json({
                message: 'change password user successfuly',
                data: userUpdated,
            })
        } catch(err) {
            next(err);
        }
    }


}

module.exports = UserController;