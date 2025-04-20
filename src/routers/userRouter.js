const express = require('express');

const container = require('../di');
const errorHandler = require('../middlewares/errorHandler');

const userRouter = express.Router();

userRouter.post('/users/register', errorHandler(container.resolve('userRegistrationController')));
userRouter.get('/users/login', errorHandler(container.resolve('loginController')));

module.exports = userRouter;
