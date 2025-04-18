const awilix = require('awilix');

const UserRepository = require('./repository/userRepository');
const TokenService = require('./services/tokenService');
const CryptographyService = require('./services/cryptographyService');
const HealthCheckController = require('./controllers/healthcheckController');
const UserController = require('./controllers/userController');
const UserRegistrationCommand = require('./commands/userRegistrationCommand');

const container = awilix.createContainer();

container.register({
  // repositories
  userRepository: awilix.asClass(UserRepository),

  // services
  tokenService: awilix.asClass(TokenService),
  cryptographyService: awilix.asClass(CryptographyService),

  // commands
  userRegistrationCommand: awilix.asClass(UserRegistrationCommand),

  // controllers
  healthCheckController: awilix.asClass(HealthCheckController),
  userController: awilix.asClass(UserController),
});

module.exports = container;
