const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

class LoginController {
  constructor({ userRegistrationCommand, loginCommand }) {
    this.userRegistrationCommand = userRegistrationCommand;
    this.loginCommand = loginCommand;
  }

  handleRequest = async (req, res) => {
    const { email, password } = req.body;

    const validationResult = schema.validate({ email, password }, { abortEarly: false });
    if (validationResult.error) {
      const errors = validationResult.error.details.map(errorDetail => {
        return errorDetail.message;
      });

      return res.status(400).json({ message: errors });
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
