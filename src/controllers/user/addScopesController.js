const SCOPES = require('../../enums/scopes');

class AddScopesController {
  constructor({ addScopesCommand }) {
    this.addScopesCommand = addScopesCommand;
  }

  handleRequest = async (req, res) => {
    const userId = parseInt(req.params.id);
    const scopes = req.body.scopes;

    const invalidScopes = [];

    for (let scope of scopes) {
      if (Object.values(SCOPES).indexOf(scope) === -1)
        invalidScopes.push(scope);
    }

    if (invalidScopes.length > 0) {
      return res.status(400).json({ message: 'Invalid scopes', scopes: invalidScopes });
    }

    const result = await this.addScopesCommand.execute({ userId, scopes });

    if (result.error) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'Scopes added successfully' });
  }
}

module.exports = AddScopesController;
