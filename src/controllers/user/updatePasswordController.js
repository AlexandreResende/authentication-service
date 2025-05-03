const Joi = require('joi');

const schema = Joi.object({
  password: Joi.string().required(),
});

class UpdatePasswordController {
  constructor({ updatePasswordCommand }) {
    this.updatePasswordCommand = updatePasswordCommand;
  }

  handleRequest = async (req, res) => {
    const id = parseInt(req.params.id);
    const password = req.body.password;

    const validationResult = schema.validate({ password }, { abortEarly: false });
    if (validationResult.error) {
      const errors = validationResult.error.details.map(errorDetail => {
        return errorDetail.message;
      });

      return res.status(400).json({ message: errors });
    }

    await this.updatePasswordCommand.execute({ id, password });

    return res.status(200).json({ message: 'User password updated' });
  }
}

module.exports = UpdatePasswordController;
