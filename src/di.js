const awilix = require('awilix');

const TokenService = require('./services/tokenService');
const HealthCheckController = require('./controllers/healthcheckController');

const container = awilix.createContainer();

container.register({
  // repositories

  // services
  tokenService: awilix.asClass(TokenService),

  // commands

  // controllers
  healthCheckController: awilix.asClass(HealthCheckController),
});

module.exports = container;
