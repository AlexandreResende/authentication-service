class RemoveScopesCommand {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  execute = async (parameters) => {
    const { userId, scopes } = parameters;

    const user = await this.userRepository.findById(userId);

    if (!user) 
      return { error: { message: 'User not found' } };

    const updatedScopes = user.removeScopes(scopes);

    await this.userRepository.updateScopes(userId, updatedScopes);

    return { message: 'Success' };
  }
}

module.exports = RemoveScopesCommand;
