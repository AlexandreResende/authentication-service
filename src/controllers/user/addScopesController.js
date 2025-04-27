class AddScopesController {
  constructor({ addScopesCommand }) {
    this.addScopesCommand = addScopesCommand;
  }

  handleRequest = async (req, res) => {
    const userId = parseInt(req.params.id);
    const scopes = req.body.scopes;

    const result = await this.addScopesCommand.execute({ userId, scopes });

    if (result.error) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'Scopes added successfully' });
  }
}

module.exports = AddScopesController;
