const express = require('express');

const container = require('../di');
const errorHandler = require('../middlewares/errorHandler');

const userRouter = express.Router();

userRouter.post('/users/register', errorHandler(container.resolve('userRegistrationController')));
userRouter.get('/users/login', errorHandler(container.resolve('loginController')));
userRouter.patch('/users/:id', errorHandler(container.resolve('updatePasswordController')));
userRouter.patch('/users/scopes/:id', errorHandler(container.resolve('addScopesController')));
userRouter.patch('/users/scopes/remove/:id', errorHandler(container.resolve('removeScopesController')));
userRouter.delete('/users/:id', errorHandler(container.resolve('deleteUserController')));

module.exports = userRouter;
