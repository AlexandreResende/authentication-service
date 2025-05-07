const awilix = require('awilix');

const UserRepository = require('./repository/userRepository');
const TokenService = require('./services/tokenService');
const CryptographyService = require('./services/cryptographyService');
const HealthCheckController = require('./controllers/healthcheckController');
const UserRegistrationController = require('./controllers/user/userRegistrationController');
const DeleteUserController = require('./controllers/user/deleteUserController');
const UpdatePasswordController = require('./controllers/user/updatePasswordController');
const AddScopesController = require('./controllers/user/addScopesController');
const RemoveScopesController = require('./controllers/user/removeScopesController');
const LoginController = require('./controllers/user/loginController');
const UserRegistrationCommand = require('./commands/userRegistrationCommand');
const DeleteUserCommand = require('./commands/deleteUserCommand');
const UpdatePasswordCommand = require('./commands/updatePasswordCommand');
const LoginCommand = require('./commands/loginCommand');
const AddScopesCommand = require('./commands/addScopesCommand');
const RemoveScopesCommand = require('./commands/removeScopesCommand');
const ValidatorService = require('./services/validatorService');

const container = awilix.createContainer();

container.register({
  // repositories
  userRepository: awilix.asClass(UserRepository),

  // services
  tokenService: awilix.asClass(TokenService),
  cryptographyService: awilix.asClass(CryptographyService),
  validatorService: awilix.asClass(ValidatorService),

  // commands
  userRegistrationCommand: awilix.asClass(UserRegistrationCommand),
  loginCommand: awilix.asClass(LoginCommand),
  updatePasswordCommand: awilix.asClass(UpdatePasswordCommand),
  deleteUserCommand: awilix.asClass(DeleteUserCommand),
  addScopesCommand: awilix.asClass(AddScopesCommand),
  removeScopesCommand: awilix.asClass(RemoveScopesCommand),

  // controllers
  healthCheckController: awilix.asClass(HealthCheckController),
  userRegistrationController: awilix.asClass(UserRegistrationController),
  loginController: awilix.asClass(LoginController),
  updatePasswordController: awilix.asClass(UpdatePasswordController),
  deleteUserController: awilix.asClass(DeleteUserController),
  addScopesController: awilix.asClass(AddScopesController),
  removeScopesController: awilix.asClass(RemoveScopesController),
});

module.exports = container;
