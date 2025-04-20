const ERRORS = require("../enums/errors");
const ApplicationError = require("../applicationError");

class UserRegistrationCommand {
  constructor({ userRepository, cryptographyService }) {
    this.userRepository = userRepository;
    this.cryptographyService = cryptographyService;
  }

  execute = async(parameters) => {
    let user = await this.userRepository.findByUsernameAndEmail(parameters.username, parameters.email);

    if (user) 
      throw new ApplicationError(ERRORS.USER_ALREADY_EXISTS, 'Username or email already exist')

    user = await this.userRepository.create({
      ...parameters,
      password: this.cryptographyService.cipher(parameters.password),
      createdAt: Date.now(),
    });

    return { message: 'Success', user };
  }
}

module.exports = UserRegistrationCommand;
