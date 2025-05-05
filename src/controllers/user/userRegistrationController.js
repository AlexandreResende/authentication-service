const Joi = require('joi');

const schema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  fullName: Joi.string().required(),
});

class UserRegistrationController {
  constructor({ userRegistrationCommand, loginCommand }) {
    this.userRegistrationCommand = userRegistrationCommand;
    this.loginCommand = loginCommand;
  }

  handleRequest = async (req, res) => {
    const userData = req.body;

    const validationResult = schema.validate(userData, { abortEarly: false });
    if (validationResult.error) {
      const errors = validationResult.error.details.map(errorDetail => {
        return errorDetail.message;
      });

      return res.status(400).json({ message: errors });
    }

    const result = await this.userRegistrationCommand.execute(userData);

    if (result.error) {
      return res.status(409).json({ message: result.error.message });
    }

    return res.status(201).json({ ...result.user });
  }
}

module.exports = UserRegistrationController;
