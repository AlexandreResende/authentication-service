class UserController {
  constructor({ userRegistrationCommand, loginCommand }) {
    this.userRegistrationCommand = userRegistrationCommand;
    this.loginCommand = loginCommand;
  }

  register = async (req, res) => {
    const userData = req.body;

    const result = await this.userRegistrationCommand.execute(userData);

    if (result.error) {
      return res.status(409).json({ message: result.error.message });
    }

    return res.status(201).json({ ...result.user });
  }

  login = async (req, res) => {
    const { email, password } = req.body;

    const result = await this.loginCommand.execute({ email, password });

    if (result.error) {
      const statusCode = {
        'User not found': 404,
        'Invalid email or password': 409,
      };
      return res.status(statusCode[result.error.message]).json({ message: result.error.message });
    }

    return res.status(200).json({ access_token: result.access_token, refresh_token: result.refresh_token });
  }
}

module.exports = UserController;
