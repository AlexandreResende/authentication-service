const { faker } = require('@faker-js/faker');

const UserEntity = require('../../src/entities/userEntity');

const userEntityFactory = (userData = {}) => {
  const userMockedData = {
    id: faker.number.int({ min: 1 }),
    fullName: faker.person.fullName(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    scopes: '',
    refreshToken: undefined,
    createdAt: Date.now(),
    updatedAt: null,
  };

  return UserEntity.toEntity({ ...userMockedData, ...userData });
};

module.exports = userEntityFactory;
