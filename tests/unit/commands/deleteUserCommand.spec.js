const { faker } = require('@faker-js/faker');
const sinon = require('sinon');

const UserRepository = require('../../../src/repository/userRepository');
const DeleteUserCommand = require('../../../src/commands/deleteUserCommand');

describe('Unit test', function() {
  describe('DeleteUserCommand', function() {
    const userRepository = new UserRepository();

    this.afterEach(() => {
      sinon.restore();
    });

    it('deletes the user when a valid userId is passed', async function() {
      const userId = faker.number.int({ min: 1 });

      sinon.stub(userRepository, 'delete').resolves();

      const command = new DeleteUserCommand({ userRepository });

      const result = await command.execute({ userId });

      expect(result.message).to.be.equal('Success');
    });
  })
});