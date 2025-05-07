const Joi = require('joi');

const schema = Joi.object({
  password: Joi.string().required(),
});

class UpdatePasswordController {
  constructor({ updatePasswordCommand, validatorService }) {
    this.updatePasswordCommand = updatePasswordCommand;
    this.validatorService = validatorService;
  }

  handleRequest = async (req, res) => {
    const id = parseInt(req.params.id);
    const password = req.body.password;

    const validationResult = this.validatorService.validate(req.body, schema);
    if (validationResult.length > 0) {
      return res.status(400).json({ message: validationResult });
    }

    await this.updatePasswordCommand.execute({ id, password });

    return res.status(200).json({ message: 'User password updated' });
  }
}

module.exports = UpdatePasswordController;
