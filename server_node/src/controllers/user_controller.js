const UserService = require('../services/user-service');
const user_service = new UserService();
class UserController {
    constructor(){}
    addUser = async (req, res) => {
        try {
            const result = await user_service.addUser(req.body);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
    deleteUser = async (req, res) => {
        try {
            console.log(req)
            const result = await user_service.deleteUser(req);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
    updateUser = async (req, res) => {
        try {
            const result = await user_service.updateUser(req.params.id, req.body);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
    getUsers = async (req, res) => {
        try {
            const result = await user_service.getUsers();
            res.send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
    getUserById = async (req, res) => {
        try {
            const result = await user_service.getUserById(req);
            res.send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
}

module.exports = UserController;