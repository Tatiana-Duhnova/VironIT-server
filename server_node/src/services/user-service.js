const User = require('../models/user');

class UserService {
    constructor(){
        this.getUsers();
        this.arrUsers;
        this.userById;
    }
    getUsers = async () => {
        return await User.find({});
    }

    getUserById = async function(req) {
        try {
            return await User.findById(req.params.id)
        } catch (e){
            console.log(e);
        }
    }

    addUser = async (body) => {
        try {
            const user = new User(body);
            await user.save();
            return user;
        } catch(e){
            console.log(e);
        }
    }

    updateUser = async (id, body) => {
        try {
            return await User.findByIdAndUpdate(id, body);
        } catch (e) {
            console.log(e);
        }
    }
    
    deleteUser = async (req) => {
        try {
            return await User.findById(req.params.id).remove();
        } catch(e){
            console.log(e);
        }
    }
}

module.exports = UserService;
