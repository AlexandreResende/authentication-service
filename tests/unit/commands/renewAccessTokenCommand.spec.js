const { faker } = require('@faker-js/faker');
const sinon = require('sinon');

const TokenService = require('../../../src/services/tokenService');
const UserRepository = require('../../../src/repository/userRepository');
const RenewAccessTokenCommand = require('../../../src/commands/renewAccessTokenCommand');
const userEntityFactory = require('../../mocks/UserEntityFactory');
const ERRORS = require('../../../src/enums/errors');

describe('Unit test', function() {
  describe('RenewAccessTokenCommand', function() {
    const tokenService = new TokenService();
    const userRepository = new UserRepository();

    afterEach(() => {
      sinon.restore();
    });

    it('renews the user access token and refresh token', async function() {
      const userId = faker.number.int({ min: 1 });
      const refreshToken = tokenService.generateRefreshToken({ id: userId });
      const user = userEntityFactory({ id: userId, refreshToken });

      sinon.stub(userRepository, 'findById').resolves(user);
      sinon.stub(userRepository, 'update').resolves();

      const command = new RenewAccessTokenCommand({ tokenService, userRepository });
      const result = await command.execute({ refreshToken });

      expect(result.message).to.be.equal('Success');
      expect(typeof result.accessToken).to.be.equal('string');
      expect(typeof result.refreshToken).to.be.equal('string');
    });

    it('throws a general error when it fails to verify a refresh token', async function() {
      const refreshToken = faker.lorem.word();

      const command = new RenewAccessTokenCommand({ tokenService, userRepository });

      try {
        await command.execute({ refreshToken });
      } catch (err) {
        expect(err.errorCode).to.be.equal(ERRORS.GENERAL_ERROR);
        expect(err.message).to.be.equal('A problem with the refresh token decryption occurred');
      }
    });

    it('throws a not found error when user doest not exist', async function() {
      const userId = faker.number.int({ min: 1 });
      const refreshToken = tokenService.generateRefreshToken({ id: userId });
      sinon.stub(userRepository, 'findById').resolves(null);

      const command = new RenewAccessTokenCommand({ tokenService, userRepository });
      
      try {
        await command.execute({ refreshToken });
      } catch (err) {
        expect(err.errorCode).to.be.equal(ERRORS.NOT_FOUND);
        expect(err.message).to.be.equal('User not found');
      }
    });

    it('throws an general error when refresh tokens do not match', async function() {
      const userId = faker.number.int({ min: 1 });
      const refreshToken = tokenService.generateRefreshToken({ id: userId });
      const anotherRefreshToken = tokenService.generateRefreshToken({ id: userId });
      const user = userEntityFactory({ id: userId, refreshToken: anotherRefreshToken });

      sinon.stub(userRepository, 'findById').resolves(user);
      sinon.stub(userRepository, 'update').resolves();

      const command = new RenewAccessTokenCommand({ tokenService, userRepository });
      try {
        await command.execute({ refreshToken });
      } catch (err) {
        expect(err.errorCode).to.be.equal(ERRORS.GENERAL_ERROR);
        expect(err.message).to.be.equal('Refresh token does not match');
      }
    });
  });
});