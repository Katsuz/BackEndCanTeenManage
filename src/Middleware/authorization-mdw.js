const {status} = require('./../Constant');
const {userRepository} = require('./../Database');
const {VerifyAccessToken} = require('./../Helpers');


const authorizationMDW = {
    checkUser: (req,res,next) => {
        try {
            const isAuthentication = VerifyAccessToken(req);

            if(!isAuthentication){
                return res.status(status.UN_AUTHORIZED).json({
                    message: "Your token is invalid",
                    data: null
                })
            }
            next();
        } catch (err) {
            res.status(status.FORBIDDEN).json({
                message: err.message
            });
        }
    },

    checkPermission: async(req,res,next) => {
        try{
            const isAuthentication = VerifyAccessToken(req);

            if(!isAuthentication){
                return res.status(status.UN_AUTHORIZED).json({
                    message: "Your token is invalid",
                    data: null
                })
            }

            const {_id} = req.user;
            const user = await userRepository.FindUserById(_id);
            if(!user){
                return res.status(status.UN_AUTHORIZED).json({
                    message: "User dose not exist",
                    data: null
                })
            }
            console.log(user);
            const {roleID} = await user.populate('roleID');
            console.log(roleID);
            const {permissions} = await roleID.populate('permissions');

            if(!permissions.some((e) => {
                let url = e.code; //Get url permission
                if(req.params) {
                    const params = req.params;
                    const keys = Object.keys(params);
                    const values = Object.values(params);
                    
                    keys.forEach((key, index)=>{
                        url = url.replace(`:${key}`, values[index]);
                    })
                }
                if(req.query) {
                    let symbol = '?';
                    const query = req.query;
                    const keys = Object.keys(query);
                    const values = Object.values(query);
                    keys.forEach((key, index)=> {
                        url = url.concat(symbol, key, '=', values[index]);
                        symbol = '&';
                    })
                }
                return req.originalUrl === url;
            })) {
                return res.status(status.UN_AUTHORIZED).json({
                    message: "You don't have this permissons",
                    data: null
                })
            }
        } catch(err) {
            res.status(status.FORBIDDEN).json({
                message: err.message
            });
        }
    }


}

module.exports = authorizationMDW;