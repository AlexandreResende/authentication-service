const Joi = require('joi');

const schema = Joi.object({
  token: Joi.string().required(),
});

class RenewAccessTokenController {
  constructor({ renewAccessTokenCommand, validatorService }) {
    this.renewAccessTokenCommand = renewAccessTokenCommand;
    this.validatorService = validatorService;
  }

  handleRequest = async (req, res) => {
    const token = req.body.token;

    const validationResult = this.validatorService.validate({ token }, schema);
    if (validationResult.length > 0) {
      return res.status(400).json({ message: validationResult });
    }

    const result = await this.renewAccessTokenCommand.execute({ refreshToken: token });

    return res.status(200).json({ message: 'Success', access_token: result.accessToken, refresh_token: result.refreshToken });
  }
}

module.exports = RenewAccessTokenController;
