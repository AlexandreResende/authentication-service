const UserEntity = require('../../src/entities/userEntity');

const userEntityFactory = (userData) => {
  return UserEntity.toEntity(userData);
};

module.exports = userEntityFactory;
