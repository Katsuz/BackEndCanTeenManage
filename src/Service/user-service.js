const {status,expire} = require('../Constant');
const {userRepository, roleRepository, moneycodeRepository} = require('./../Database');

const {
    genarateSalt,
    validatePassword,
    createHashPassword,
    GenerateToken,
    FormatID,
    formatData
} = require('./../Helpers')

const userService = {
    logout: async(_id) => {
        try{
            await userRepository.UpdateSateUserById(_id, false);
        } catch (err) {
            throw err;
        }
    },

    getProfile: async(id) => {
        try{
            const userInfo =  await userRepository.FindUserById(id);
            if (!userInfo) {
                throw new Error('user does not exist', {
                    cause: status.NOT_FOUND
                })
            };
            return formatData({userInfo})
        } catch{
            throw err;
        }
    },

    updateProfileUser: async(id, username) =>{
        try {
            let user =  await userRepository.FindUserById(id);
            if (!user) {
                throw new Error('user does not exist', {
                    cause: status.NOT_FOUND
                })
            };
            user = await userRepository.UpdateProfileUserById(id, username);

            return formatData({
                user
            })
        } catch (err) {
            throw err;
        }
    },

    updatePasswordUser: async(id, confirmPassword, newPassword) =>{
        try {
            const user =  await userRepository.FindUserById(id);
            if (!user) {
                throw new Error('user does not exist', {
                    cause: status.NOT_FOUND
                })
            };
            
            const compareOldPassword = await validatePassword(confirmPassword, user.password);
            if(!compareOldPassword) {
                throw new Error('old password incorrect', {
                    cause: status.BAD_REQUEST
                });
            }

            const salt = await genarateSalt();
            const passwordHashed = await createHashPassword(newPassword,salt);

            await userRepository.UpdatePasswordUserById(id, passwordHashed);

            const userUpdated = await userRepository.FindUserById(id);
            return formatData({
                userUpdated
            })

        } catch (err) {
            throw err;
        }
    },

    addProperty: async(id, codePrice)=> {
        try {
            const user =  await userRepository.FindUserById(id);
            if (!user) {
                throw new Error('user does not exist', {
                    cause: status.NOT_FOUND
                })
            };
            const listCode = await moneycodeRepository.getAllMoneyCode();

            //check code
            if(!listCode.some((e) => {
                return e.code === codePrice;
            })) {
                throw new Error('your code input not exist', {
                    cause: status.NOT_FOUND
                })
            }
            
            //Lay gia tien tu code
            const _price = await moneycodeRepository.getPriceFromCode(codePrice);
            //Lay tien nguoi dung
            //Cong tien
            const newProperty = _price.price + user.property;
            //Update tien moi

            await userRepository.UpdatePropertyUserById(id, newProperty);

            const userUpdated = await userRepository.FindUserById(id);
            return formatData({
                userUpdated
            })

        } catch (err) {
            throw err;
        }
    }
}

module.exports = userService;