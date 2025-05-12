const ApplicationError = require('../applicationError');
const ERRORS = require('../enums/errors');

class RenewAccessTokenCommand {
  constructor({ userRepository, tokenService }) {
    this.userRepository = userRepository;
    this.tokenService = tokenService;
  }

  execute = async (parameters) => {
    const refreshToken = parameters.refreshToken;
    let decipheredToken;

    try {
      decipheredToken = this.tokenService.verify(refreshToken);
    } catch (error) {
      console.log(error)
      throw new ApplicationError(ERRORS.GENERAL_ERROR, 'A problem with the refresh token decryption occurred');
    }

    const userId = decipheredToken.id;

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ApplicationError(ERRORS.NOT_FOUND, 'User not found');
    }

    if (!user.matchRefreshToken(refreshToken)) {
      throw new ApplicationError(ERRORS.GENERAL_ERROR, 'Refresh token does not match');
    }

    const accessToken = this.tokenService.generateAccessToken({
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      scopes: user.scopes,
    });
    const newRefreshToken = this.tokenService.generateRefreshToken({
      id: user.id
    });

    await this.userRepository.update(userId, { refreshToken: newRefreshToken });

    return { message: 'Success', accessToken, refreshToken: newRefreshToken };
  }
}

module.exports = RenewAccessTokenCommand;
