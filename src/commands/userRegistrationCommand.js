class UserRegistrationCommand {
  constructor({ userRepository, cryptographyService }) {
    this.userRepository = userRepository;
    this.cryptographyService = cryptographyService;
  }

  execute = async(parameters) => {
    let user = await this.userRepository.findByUsernameAndEmail(parameters.username, parameters.email);

    if (user) {
      return { error: { message: 'Username or email already exist' } };
    }

    user = await this.userRepository.create({
      ...parameters,
      password: this.cryptographyService.cipher(parameters.password),
      createdAt: Date.now(),
    });

    return { message: 'Success', user };
  }
}

module.exports = UserRegistrationCommand;
