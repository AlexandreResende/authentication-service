const express = require('express');

const HealthCheckController = require('../controllers/healthcheckController');

const healthcheckRouter = express.Router();

healthcheckRouter.get('/health-check', new HealthCheckController().check);

module.exports = healthcheckRouter;
