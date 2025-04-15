const awilix = require('awilix');

const UserRepository = require('./repository/userRepository');
const TokenService = require('./services/tokenService');
const HealthCheckController = require('./controllers/healthcheckController');

const container = awilix.createContainer();

container.register({
  // repositories
  userRepository: awilix.asClass(UserRepository),

  // services
  tokenService: awilix.asClass(TokenService),

  // commands

  // controllers
  healthCheckController: awilix.asClass(HealthCheckController),
});

module.exports = container;
