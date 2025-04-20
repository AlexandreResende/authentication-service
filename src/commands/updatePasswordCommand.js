class UpdatePasswordCommand {
  constructor({ userRepository, cryptographyService }) {
    this.userRepository = userRepository;
    this.cryptographyService = cryptographyService;
  }

  execute = async (parameters) => {
    const { id, password } = parameters;

    const cipheredPassword = this.cryptographyService.cipher(password);
    await this.userRepository.update(id, { password: cipheredPassword });

    return { message: 'Success' };
  }
}

module.exports = UpdatePasswordCommand;
