const express = require('express');

const container = require('../di');

const userRouter = express.Router();

userRouter.post('/users/register', container.resolve('userController').register);
userRouter.get('/users/login', container.resolve('userController').login);

module.exports = userRouter;
