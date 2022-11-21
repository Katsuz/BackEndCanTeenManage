const {Role} = require('./../Model');

const roleRepository = {
    GetRoleIdByRoleName: async(rolename) =>{
        try {
            const role = await Role.findOne({name: rolename}).populate('permissions');
            return role;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = roleRepository;