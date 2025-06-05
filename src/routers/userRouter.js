const express = require('express');

const container = require('../di');
const errorHandler = require('../middlewares/errorHandler');

const userRouter = express.Router();

userRouter.post('/users/register', errorHandler(container.resolve('userRegistrationController')), (req, res, next) => {
  /*  #swagger.start
  
      #swagger.path = '/users/register'
      #swagger.method = 'post'
      #swagger.description = 'This endpoint is responsible for creating new users'
      #swagger.produces = ['application/json']
      #swagger.consumes = ['application/json']
  
      #swagger.parameters['body'] = {
        in: 'body',
        description: 'User data',
        required: true,
        schema: {
          username: "alex123",
          password: "batataarroz",
          email: "123alex@gmail.com",
          fullName: "John Doe"
        }
      } 
      #swagger.responses[201]
      #swagger.responses[400]
      #swagger.responses[409]
      #swagger.end
  */

  next();
});
userRouter.get('/users/login', errorHandler(container.resolve('loginController')), (req, res, next) => {
  /*  #swagger.start
  
      #swagger.path = '/users/login'
      #swagger.method = 'get'
      #swagger.description = 'This endpoint is responsible for login in users'
      #swagger.produces = ['application/json']
      #swagger.consumes = ['application/json']
  
      #swagger.parameters['body'] = {
        in: 'body',
        description: 'User data',
        required: true,
        schema: {
          email: "alex123@gmail.com",
          password: "batataarroz"
        }
      } 
      #swagger.responses[200]
      #swagger.responses[400]
      #swagger.responses[404]
      #swagger.end
  */
  next();
});
userRouter.patch('/users/:id', errorHandler(container.resolve('updatePasswordController')));
userRouter.patch('/users/scopes/:id', errorHandler(container.resolve('addScopesController')));
userRouter.patch('/users/scopes/remove/:id', errorHandler(container.resolve('removeScopesController')));
userRouter.delete('/users/:id', errorHandler(container.resolve('deleteUserController')), (req, res, next) => {
  /*  #swagger.start
  
      #swagger.path = '/users/:id'
      #swagger.method = 'delete'
      #swagger.description = 'This endpoint is responsible for deleting users'
      #swagger.produces = ['application/json']
      #swagger.consumes = ['application/json']
  
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'User id',
        required: true,
        type: 'integer'
      } 

      #swagger.responses[201]
      #swagger.end
  */

  next();
});
userRouter.post('/refresh', errorHandler(container.resolve('renewAccessTokenController')), (req, res, next) => {
  /*  #swagger.start
  
      #swagger.path = '/refresh'
      #swagger.method = 'post'
      #swagger.description = 'This endpoint is responsible for renewing the access token and refresh token'
      #swagger.produces = ['application/json']
      #swagger.consumes = ['application/json']
  
      #swagger.parameters['body'] = {
        in: 'body',
        description: 'Token to be sent',
        required: true,
        schema: {
          token: "a_valid_jwt_token"
        }
      } 
      #swagger.responses[200]
      #swagger.responses[400]
      #swagger.end
  */

  next();
});

module.exports = userRouter;
