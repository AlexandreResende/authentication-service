class RemoveScopesController {
  constructor({ removeScopesCommand }) {
    this.command = removeScopesCommand;
  }

  handleRequest = async (req, res) => {
    const userId = parseInt(req.params.id);
    const scopes = req.body.scopes;

    const result = await this.command.execute({ userId, scopes });

    if (result.error)
      return res.status(404).json({ message: 'User not found' });

    return res.status(200).json({ message: 'Scopes removed' });
  }
}

module.exports = RemoveScopesController;
