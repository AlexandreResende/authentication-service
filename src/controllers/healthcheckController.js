class HealthCheckController {
  constructor() {}

  handleRequest = async (_, res)  => {
    return res.status(200).json({ message: 'OK' });
  }
}

module.exports = HealthCheckController;
