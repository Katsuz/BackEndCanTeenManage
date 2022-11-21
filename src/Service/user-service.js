const {status,expire} = require('../Constant');
const {userRepository, roleRepository} = require('./../Database');

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
    }
}

module.exports = userService;