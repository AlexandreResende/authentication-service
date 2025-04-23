class DeleteUserCommand {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  execute = async (parameters) => {
    const { userId } = parameters;

    await this.userRepository.delete(userId);

    return { message: 'Success' };
  }
}

module.exports = DeleteUserCommand;
