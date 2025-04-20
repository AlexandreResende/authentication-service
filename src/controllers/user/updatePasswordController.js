class UpdatePasswordController {
  constructor({ updatePasswordCommand }) {
    this.updatePasswordCommand = updatePasswordCommand;
  }

  handleRequest = async (req, res) => {
    const id = parseInt(req.params.id);
    const password = req.body.password;

    await this.updatePasswordCommand.execute({ id, password });

    return res.status(200).json({ message: 'User password updated' });
  }
}

module.exports = UpdatePasswordController;
