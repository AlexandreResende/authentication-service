class DeleteUserController {
  constructor({ deleteUserCommand }) {
    this.deleteUserCommand = deleteUserCommand;
  }

  handleRequest = async (req, res) => {
    const userId = parseInt(req.params.id);

    await this.deleteUserCommand.execute({ userId });

    return res.status(200).json({ message: 'User deleted successfully' });
  }
}

module.exports = DeleteUserController;
