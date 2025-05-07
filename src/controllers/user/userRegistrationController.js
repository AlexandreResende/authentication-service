const Joi = require('joi');

const schema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  fullName: Joi.string().required(),
});

class UserRegistrationController {
  constructor({ userRegistrationCommand, loginCommand, validatorService }) {
    this.userRegistrationCommand = userRegistrationCommand;
    this.loginCommand = loginCommand;
    this.validatorService = validatorService;
  }

  handleRequest = async (req, res) => {
    const userData = req.body;

    const validationResult = this.validatorService.validate(req.body, schema);
    if (validationResult.length > 0) {
      return res.status(400).json({ message: validationResult });
    }

    const result = await this.userRegistrationCommand.execute(userData);

    if (result.error) {
      return res.status(409).json({ message: result.error.message });
    }

    return res.status(201).json({ ...result.user });
  }
}

module.exports = UserRegistrationController;
