const express = require('express');

const container = require('../di');
const errorHandler = require('../middlewares/errorHandler');

const healthcheckRouter = express.Router();

healthcheckRouter.get('/health-check', errorHandler(container.resolve('healthCheckController')), (req, res, next) => {
   /*  #swagger.start
  
      #swagger.path = '/health-check'
      #swagger.method = 'get'
      #swagger.description = 'This endpoint checks the health of the application'
      #swagger.produces = ['application/json']
      #swagger.consumes = ['application/json']
  
      #swagger.responses[200]
      #swagger.responses[500]
      #swagger.end
  */

});

module.exports = healthcheckRouter;
