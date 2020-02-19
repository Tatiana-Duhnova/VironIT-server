// const authMiddleware = require('../middleware/auth');
const userService = require('../services/user-service');
const express = require('express');
const userRouter = express.Router();

userRouter.post('/login', userService.getUser);
userRouter.post('/registration', userService.addUser);
userRouter.post('/saveImage', userService.saveImg);
userRouter.get('/users', userService.getAllUsers);
userRouter.get('/images', userService.getImg);
userRouter.put('/redaction', userService.updateUserInfo);

module.exports = userRouter;