const { PrismaClient } = require('../../prisma/generated/prisma');

const User = require('../entities/userEntity');

class UserRepository {
  client = new PrismaClient();

  constructor() {}

  async getAll() {
    return this.client.user.findMany();
  }

  async findById(userId) {
    const user = await this.client.user.findUnique({ where: { id: userId } });

    if (!user) return null;

    return User.toEntity(user);
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

  async updateScopes(userId, scopes) {
    const scopesToString = scopes.join();

    await this.update(userId, { scopes: scopesToString });
  }

  async update(userId, userData) {
    await this.client.user.update({ where: { id: userId }, data: userData });
  }

  async delete(userId) {
    await this.client.user.delete({ where: { id: userId } });
  }
}

module.exports = UserRepository;
