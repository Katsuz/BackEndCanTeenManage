const {User} = require('../Model');//Lay data tu user
//const { updateOne } = require('../Model/users/permision-model');

const userRepository = {
    CreateUser: async ({username, password, email, IdUser, role }) => {
        try {
            const newUser = new User({
                username: username,
                email: email,
                password: password,
                IdUser: IdUser,
                roleID: role,
            })
            
            //save into database
            const result = await newUser.save();
            console.log(result);
            return result;
        } catch (err) {
            throw err;
        }
    },
    FindUserByEmail: async(email) => {
        try {
            const result = await User.findOne({email: email});
            return result;
        } catch(err){
            throw err;
        }
    },
    
    FindUserById: async(_id)=> {
        try {
            const result = await User.findOne({_id: _id});
            return result;
        }
        catch(err) {
            throw err;
        }
    },

    UpdateSateUserById: async(_id, status) => {
        try{
            await User.updateOne({_id: _id}, {
                $set: {
                    status: status
                }
            })
        } catch (err) {
            throw err;
        }
    },

    GetNumberOfCollection: async() => {
        try{
            let result = await User.find();
            return result;
        } catch (err) {
            throw err;
        }
    },

    UpdateProfileUserById: async(id,username) => {
        try{
            await User.updateOne({_id: id},{
                $set:{
                    username: username
                }
            })
            const user = await User.findOne({_id: id});
            return user;
        } catch(err){   
            throw err;
        }
    },
    UpdatePasswordUserById: async(id,passwordHashed) => {
        try{
            await User.updateOne({_id: id},{
                $set:{
                    password: passwordHashed
                }
            })
        } catch(err){   
            throw err;
        }
    },

    UpdatePropertyUserById: async(id, newProperty) => {
        try{
            await User.updateOne({_id: id},{
                $set:{
                    property: newProperty
                }
            })
        } catch(err){   
            throw err;
        }
    },

    UpdatePasswordUserByEmail: async(email,passwordHashed) => {
        try{
            await User.updateOne({email: email},{
                $set:{
                    password: passwordHashed
                }
            })
        } catch(err){   
            throw err;
        }
    }
    
    
}

module.exports = userRepository;