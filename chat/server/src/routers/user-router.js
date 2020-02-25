import express from 'express';

import * as userService from '../services/user-service';

const userRouter = express.Router();

userRouter.post('/login', userService.getUser);
userRouter.post('/registration', userService.addUser);
userRouter.post('/saveImage', userService.saveImg);
userRouter.get('/users', userService.getAllUsers);
userRouter.get('/images', userService.getImg);
userRouter.put('/redaction', userService.updateUserInfo);

export default userRouter;