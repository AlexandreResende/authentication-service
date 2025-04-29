const ERRORS = require('../enums/errors');
const ApplicationError = require('../applicationError');

class LoginCommand {
  constructor({ userRepository, cryptographyService, tokenService }) {
    this.userRepository = userRepository;
    this.cryptographyService = cryptographyService;
    this.tokenService = tokenService;
  }

  execute = async (parameters) => {
    const user = await this.userRepository.findByEmail(parameters.email);

    if (!user)
      throw new ApplicationError(ERRORS.NOT_FOUND, 'User not found');

    if (this.cryptographyService.cipher(parameters.password) !== user.getPassword()) 
      throw new ApplicationError(ERRORS.INVALID_PASSWORD, 'Invalid email or password');

    const accessToken = this.tokenService.generateAccessToken({
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      scopes: user.scopes,
    });
    const refreshToken = this.tokenService.generateRefreshToken({
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      scopes: user.scopes,
    });

    return { message: 'Success', access_token: accessToken, refresh_token: refreshToken };
  }
}

module.exports = LoginCommand;
