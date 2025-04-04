const TokenService = require('../services/tokenService');

class AuthenticationController {
  constructor() {
    this.tokenService = new TokenService();
  }

  authenticate(req, res) {
    const token = req.headers['authorization'];
    const tokenValidated = this.tokenService.validate(token);

    return res.status(200).json(tokenValidated);
  }
}

module.exports = AuthenticationController;
