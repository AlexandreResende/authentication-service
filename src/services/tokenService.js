const jwt = require('jsonwebtoken');
const { TOKEN } = require('../environments');

class TokenService {
  validate(token) {
    try {
      const data = jwt.verify(token, TOKEN.SECRET);

      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  generate(data, expirationTime) {
    const token = jwt.sign(
      data,
      TOKEN.SECRET,
      { algorithm: 'HS256', expiresIn: expirationTime }
    );

    return token;
  }

  generateAccessToken(data) {
    return this.generate(data, TOKEN.ACCESS_TOKEN_EXPIRATION_TIME);
  }

  generateRefreshToken(data) {
    return this.generate(data, TOKEN.REFRESH_TOKEN_EXPIRATION_TIME);
  }
}

module.exports = TokenService;
