class LoginCommand {
  constructor({ userRepository, cryptographyService, tokenService }) {
    this.userRepository = userRepository;
    this.cryptographyService = cryptographyService;
    this.tokenService = tokenService;
  }

  execute = async (parameters) => {
    const user = await this.userRepository.findByEmail(parameters.email);

    if (!user)
      return { error: { message: 'User not found' } };

    if (this.cryptographyService.cipher(parameters.password) !== user.getPassword()) 
      return { error: { message: 'Invalid email or password' } };

    const accessToken = this.tokenService.generateAccessToken({ id: user.id, username: user.username, fullName: user.fullName });
    const refreshToken = this.tokenService.generateRefreshToken({ id: user.id, username: user.username, fullName: user.fullName });

    return { message: 'Success', access_token: accessToken, refresh_token: refreshToken };
  }
}

module.exports = LoginCommand;
