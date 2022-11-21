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

    getNumberOfCollection: async() => {
        try{
            let result = await User.find();
            return result;
        } catch (err) {
            throw err;
        }
    }
    
}

module.exports = userRepository;