const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

class LoginController {
  constructor({ userRegistrationCommand, loginCommand, validatorService }) {
    this.userRegistrationCommand = userRegistrationCommand;
    this.loginCommand = loginCommand;
    this.validatorService = validatorService;
  }

  handleRequest = async (req, res) => {
    const { email, password } = req.body;

    const validationResult = this.validatorService.validate(req.body, schema);
    if (validationResult.length > 0) {
      return res.status(400).json({ message: validationResult });
    }

    const result = await this.loginCommand.execute({ email, password });

    if (result.error) {
      const statusCode = {
        'User not found': 404,
        'Invalid email or password': 409,
      };
      return res.status(statusCode[result.error.message]).json({ message: result.error.message });
    }

    return res.status(200).json({ access_token: result.access_token, refresh_token: result.refresh_token });
  }
}

module.exports = LoginController;
