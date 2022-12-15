const {status,expire} = require('../Constant');
const {userRepository, roleRepository, productRepository} = require('./../Database');
const emailHandle = require('./../Helpers/mailHandle');

const {
    genarateSalt,
    validatePassword,
    createHashPassword,
    GenerateToken,
    FormatID,
    formatData
} = require('./../Helpers');

const {
    ACCESS_TOKEN
} = require('./../Config')

const authService = {
    register: async(username, email, password, role = 'user') => {
        try{
            const user = await userRepository.FindUserByEmail(email);
            if(user){//Neu ton tai thi tra ve
                throw new Error('Email has existed',{
                    cause: status.NOT_FOUND
                })
            }
            const numberCollection = await userRepository.GetNumberOfCollection();
            const newIdUser = FormatID(numberCollection.length);

            const salt = await genarateSalt();
            const passwordHashed = await createHashPassword(password,salt);
            
            let _role = await roleRepository.GetRoleIdByRoleName(role);
            
            const newUser = await userRepository.CreateUser({
                username: username,
                email: email,
                password: passwordHashed,
                IdUser: newIdUser,
                role: _role._id
            });

            return formatData({newUser});
        } catch(err) {
            throw err;
        }
    },
    login: async(email,password) => {
        try{
            const user = await userRepository.FindUserByEmail(email);
            if(!user){//Neu khong ton tai thi tra ve
                throw new Error('User not exist',{
                    cause: status.NOT_FOUND
                })
            }
            // check password
            const validPassword = await validatePassword(password,user.password);
            if(!validPassword) {
                throw new Error('incorrect password', {
                    cause: status.BAD_REQUEST
                });
            }
            // update sate user
            await userRepository.UpdateSateUserById(user._id,true);
            //user.status = true;

            // get data 
            const {password: _password, ...payload} = user._doc;

            //create token
            const token = GenerateToken(payload, ACCESS_TOKEN, expire.ACCESS_TOKEN_EXPIRE);
            return formatData({payload, accessToken: token});
        } catch (err) {
            throw err;
        }
    },
    CurrentProduct: async() => {
        try{

            const curProduct = await productRepository.GetCurrentProduct();
            return formatData({product: curProduct})
        } catch(err) {
            throw err;
        }
    },
    
    sendNewPasswordIntoEmail: async(email) => {
        try{
            
            const user = await userRepository.FindUserByEmail(email);
            if(!user){//Neu khong ton tai thi tra ve
                throw new Error('No user have this email',{
                    cause: status.NOT_FOUND
                })
            }
            //tao password moi
            var randPassword = Array(6).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(
                function(x) { return x[Math.floor(Math.random() * x.length)] 
                }).join('');
            //hash password moi
            const salt = await genarateSalt();
            const randPasswordHashed = await createHashPassword(randPassword,salt);
            //xoa password cu, cap nhat password moi
            await userRepository.UpdatePasswordUserByEmail(email,randPasswordHashed);
            //gui mail password moi            
            await emailHandle.sendingMail(email,randPassword);

            return formatData({data: "Success"})
        } catch(err) {
            throw err;
        }
    }
}

module.exports = authService;