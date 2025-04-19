const { faker } = require('@faker-js/faker');
const sinon = require('sinon');

const userEntityFactory = require('../../../mocks/UserEntityFactory');
const UserRepository = require('../../../../src/repository/userRepository');
const CryptographyService = require('../../../../src/services/cryptographyService');
const LoginCommand = require('../../../../src/commands/loginCommand');
const TokenService = require('../../../../src/services/tokenService');

describe('Unit test', function() {
  describe('userRegistrationCommand', function() {
    const userRepository = new UserRepository();
    const tokenService = new TokenService();
    const cryptographyService = new CryptographyService();

    this.afterEach(() => {
      sinon.restore();
    })

    it('returns an access token and refresh token', async () => {
      const userData = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      sinon.stub(userRepository, 'findByEmail').resolves(userEntityFactory({
        ...userData,
        id: faker.number.int({ min: 1 }),
        password: cryptographyService.cipher(userData.password),
        createdAt: Date.now(),
        updatedAt: null
      }));

      const command = new LoginCommand({ userRepository, cryptographyService, tokenService });

      const result = await command.execute(userData);

      expect(result.message).to.be.equal('Success');
      expect(typeof result.access_token).to.be.equal('string');
      expect(typeof result.refresh_token).to.be.equal('string');
    });

    it('returns a not found error when user does not exist', async () => {
      const userData = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      sinon.stub(userRepository, 'findByEmail').resolves(null);

      const command = new LoginCommand({ userRepository, cryptographyService, tokenService });

      const result = await command.execute(userData);

      expect(result.error.message).to.be.equal('User not found');
    });

    it('returns an access token and refresh token', async () => {
      const userData = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      sinon.stub(userRepository, 'findByEmail').resolves(userEntityFactory({
        ...userData,
        id: faker.number.int({ min: 1 }),
        createdAt: Date.now(),
        updatedAt: null
      }));

      const command = new LoginCommand({ userRepository, cryptographyService, tokenService });

      const result = await command.execute(userData);

      expect(result.error.message).to.be.equal('Invalid email or password');
    });
  });
});