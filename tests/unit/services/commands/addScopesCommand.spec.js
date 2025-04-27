const { faker } = require('@faker-js/faker');
const sinon = require('sinon');

const AddScopesCommand = require('../../../../src/commands/addScopesCommand');
const UserRepository = require('../../../../src/repository/userRepository');
const userEntityFactory = require('../../../mocks/UserEntityFactory');

describe('Unit test', function() {
  describe('AddScopesCommand', function() {
    const userRepository = new UserRepository();

    this.afterEach(() => {
      sinon.restore();
    });

    it('adds scopes to user successfully', async function() {
      const scopes = [faker.lorem.word(), faker.lorem.word()];
      const userId = faker.number.int({ min: 1 });

      const user = userEntityFactory({ id: userId });

      sinon.stub(userRepository, 'findById').resolves(user);
      sinon.stub(userRepository, 'updateScopes').resolves();

      const command = new AddScopesCommand({ userRepository });
      const result = await command.execute({ userId, scopes });

      expect(result.message).to.be.equal('Success');
    });

    it('returns not found when user does not exist', async function() {
      const scopes = [faker.lorem.word(), faker.lorem.word()];
      const userId = faker.number.int({ min: 1 });

      sinon.stub(userRepository, 'findById').resolves(null);

      const command = new AddScopesCommand({ userRepository });
      const result = await command.execute({ userId, scopes });

      expect(result.error.message).to.be.equal('User not found');
    });
  });
});