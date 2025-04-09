const express = require('express');

const container = require('../di');

const healthcheckRouter = express.Router();

healthcheckRouter.get('/health-check', container.resolve('healthCheckController').check);

module.exports = healthcheckRouter;
