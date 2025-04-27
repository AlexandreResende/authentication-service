class AddScopesCommand {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  execute = async (parameters) => {
    const { userId, scopes } = parameters;

    const user = await this.userRepository.findById(userId);

    if (!user)
      return { error: { message: 'User not found' } };

    const newScopes = user.addScopes(scopes);

    await this.userRepository.updateScopes(userId, newScopes);

    return { message: 'Success' };
  }
}

module.exports = AddScopesCommand;
