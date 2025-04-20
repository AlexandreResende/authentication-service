class UserRegistrationController {
  constructor({ userRegistrationCommand, loginCommand }) {
    this.userRegistrationCommand = userRegistrationCommand;
    this.loginCommand = loginCommand;
  }

  handleRequest = async (req, res) => {
    const userData = req.body;

    const result = await this.userRegistrationCommand.execute(userData);

    if (result.error) {
      return res.status(409).json({ message: result.error.message });
    }

    return res.status(201).json({ ...result.user });
  }
}

module.exports = UserRegistrationController;
