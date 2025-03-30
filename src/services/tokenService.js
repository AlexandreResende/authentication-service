const jwt = require('jsonwebtoken');
const { TOKEN } = require('../environments');

class TokenService {
  validate(token) {
    try {
      const data = jwt.verify(token, TOKEN.PRIVATE_KEY);

      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  generate(data) {
    const token = jwt.sign(
      data,
      TOKEN.SECRET,
      { algorithm: 'HS256', expiresIn: TOKEN.EXPIRATION_TIME }
    );

    return token;
  }
}

module.exports = TokenService;
