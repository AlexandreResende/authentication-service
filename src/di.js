const awilix = require('awilix');

const UserRepository = require('./repository/userRepository');
const TokenService = require('./services/tokenService');
const CryptographyService = require('./services/cryptographyService');
const HealthCheckController = require('./controllers/healthcheckController');
const UserRegistrationController = require('./controllers/user/userRegistrationController');
const DeleteUserController = require('./controllers/user/deleteUserController');
const UpdatePasswordController = require('./controllers/user/updatePasswordController');
const LoginController = require('./controllers/user/loginController');
const UserRegistrationCommand = require('./commands/userRegistrationCommand');
const DeleteUserCommand = require('./commands/deleteUserCommand');
const UpdatePasswordCommand = require('./commands/updatePasswordCommand');
const LoginCommand = require('./commands/loginCommand');

const container = awilix.createContainer();

container.register({
  // repositories
  userRepository: awilix.asClass(UserRepository),

  // services
  tokenService: awilix.asClass(TokenService),
  cryptographyService: awilix.asClass(CryptographyService),

  // commands
  userRegistrationCommand: awilix.asClass(UserRegistrationCommand),
  loginCommand: awilix.asClass(LoginCommand),
  updatePasswordCommand: awilix.asClass(UpdatePasswordCommand),
  deleteUserCommand: awilix.asClass(DeleteUserCommand),

  // controllers
  healthCheckController: awilix.asClass(HealthCheckController),
  userRegistrationController: awilix.asClass(UserRegistrationController),
  loginController: awilix.asClass(LoginController),
  updatePasswordController: awilix.asClass(UpdatePasswordController),
  deleteUserController: awilix.asClass(DeleteUserController),
});

module.exports = container;
