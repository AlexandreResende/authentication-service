const { faker } = require('@faker-js/faker');
const sinon = require('sinon');

const UpdatePasswordCommand = require('../../../src/commands/updatePasswordCommand');
const UserRepository = require('../../../src/repository/userRepository');
const CryptographyService = require('../../../src/services/cryptographyService');

describe('Unit test', function() {
  describe('UpdatePasswordCommand', function() {
    const userRepository = new UserRepository();
    const cryptographyService = new CryptographyService();

    this.afterEach(() => {
      sinon.restore();
    });

    it('updates the password of the user', async function() {
      const userId = faker.number.int({ min: 1 });
      const password = faker.internet.password();

      sinon.stub(userRepository, 'update').resolves()
      
      const updatePasswordCommand = new UpdatePasswordCommand({ userRepository, cryptographyService });
      const result = await updatePasswordCommand.execute({ id: userId, password });

      expect(result.message).to.be.equal('Success');
    });
  });
});