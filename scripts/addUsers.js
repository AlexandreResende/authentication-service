const { faker } = require('@faker-js/faker');
const { PrismaClient } = require('../prisma/generated/prisma');

const client = new PrismaClient();
const amountOfUsersToBeGenerated = 10;

const generateUsers = async () => {
  for (let counter = 0; counter < amountOfUsersToBeGenerated; counter++) {
    const userData = {
      fullName: faker.person.fullName(),
      username: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: Date.now(),
      updatedAt: null
    };

    await client.user.create({
      data: userData
    });
  }
};

generateUsers();