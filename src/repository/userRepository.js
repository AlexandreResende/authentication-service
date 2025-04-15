const { PrismaClient } = require('../../prisma/generated/prisma');

class UserRepository {
  client = new PrismaClient();

  constructor() {}

  async getAll() {
    return this.client.user.findMany();
  }
}

module.exports = UserRepository;
