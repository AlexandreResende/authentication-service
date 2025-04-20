const express = require('express');

const container = require('../di');
const errorHandler = require('../middlewares/errorHandler');

const healthcheckRouter = express.Router();

healthcheckRouter.get('/health-check', errorHandler(container.resolve('healthCheckController')));

module.exports = healthcheckRouter;
