const service = require('../services/user-service');

class UserController {
    static getUser = async (req, res, next) => {
        try {
            const result = await service.getAllUsers()
            res.send(result)
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }

    static getUserId = async (req, res, next) => {
        try {
            const result = await service.getById(req)
            res.send(result)
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }

    static addUser = async (req, res) => {
        try {
            const result = await service.add(req)
            res.status(201).send(result)
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }

    static deleteUser = async (req, res) => {
        try {
            const result = await service.del(req)
            res.status(201).send(result)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }

    static updateUser = async (req, res) => {
        try {
            const result = await service.update(req)
            res.status(201).send(result)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }
}

export default UserController