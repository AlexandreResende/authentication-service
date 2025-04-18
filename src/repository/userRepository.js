const { PrismaClient } = require('../../prisma/generated/prisma');

const User = require('../entities/userEntity');

class UserRepository {
  client = new PrismaClient();

  constructor() {}

  async getAll() {
    return this.client.user.findMany();
  }

  async findByEmail(email) {
  const user = await this.client.user.findFirst({ where: { email } });

    if (!user) return null;

    return User.toEntity(user);
  }

  async findByUsernameAndEmail(username, email) {
    return this.client.user.findFirst({
      where: {
        OR: [
          { username },
          { email }
        ]
      }
    });
  }

  async create(userData) {
    const user = await this.client.user.create({ data: userData });
    
    return User.toEntity(user);
  }
}

module.exports = UserRepository;
