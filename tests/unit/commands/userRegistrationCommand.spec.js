const { faker } = require('@faker-js/faker');
const sinon = require('sinon');

const userEntityFactory = require('../../mocks/UserEntityFactory');
const UserRepository = require('../../../src/repository/userRepository');
const CryptographyService = require('../../../src/services/cryptographyService');
const UserRegistrationCommand = require('../../../src/commands/userRegistrationCommand');
const ERRORS = require('../../../src/enums/errors');

describe('Unit test', function() {
  describe('userRegistrationCommand', function() {
    const userRepository = new UserRepository();
    const cryptographyService = new CryptographyService();

    this.afterEach(() => {
      sinon.restore();
    })

    it('creates a new user when valid information is passed', async () => {
      const userData = {
        username: faker.internet.username(),
        email: faker.internet.email(),
        fullName: faker.person.fullName(),
        password: faker.internet.password(),
      };

      sinon.stub(userRepository, 'findByUsernameAndEmail').resolves(null);
      sinon.stub(userRepository, 'create').resolves(userEntityFactory({
        ...userData,
        id: faker.number.int({ min: 1 }),
        password: cryptographyService.cipher(userData.password),
        createdAt: Date.now(),
        updatedAt: null
      }));

      const command = new UserRegistrationCommand({ userRepository, cryptographyService });

      const result = await command.execute(userData);

      expect(result.user.username).to.be.equal(userData.username);
      expect(result.user.email).to.be.equal(userData.email);
      expect(result.user.fullName).to.be.equal(userData.fullName);
    });

    it('returns an error message when username already exists', async () => {
      const userData = {
        username: faker.internet.username(),
        email: faker.internet.email(),
        fullName: faker.person.fullName(),
        password: faker.internet.password(),
      };

      sinon.stub(userRepository, 'findByUsernameAndEmail').resolves(userEntityFactory({
        ...userData,
        id: faker.number.int({ min: 1 }),
        password: cryptographyService.cipher(userData.password),
        createdAt: Date.now(),
        updatedAt: null
      }));

      const command = new UserRegistrationCommand({ userRepository });

      try {
        await command.execute(userData);
      } catch (err) {
        expect(err.errorCode).to.be.equal(ERRORS.USER_ALREADY_EXISTS);
        expect(err.message).to.be.equal('Username or email already exist');
      }
    });

    it('returns an error message when email already exists', async () => {
      const userData = {
        username: faker.internet.username(),
        email: faker.internet.email(),
        fullName: faker.person.fullName(),
        password: faker.internet.password(),
      };

      sinon.stub(userRepository, 'findByUsernameAndEmail').resolves(userEntityFactory({
        ...userData,
        id: faker.number.int({ min: 1 }),
        password: cryptographyService.cipher(userData.password),
        createdAt: Date.now(),
        updatedAt: null
      }));

      const command = new UserRegistrationCommand({ userRepository });

      try {
        await command.execute(userData);
      } catch (err) {
        expect(err.errorCode).to.be.equal(ERRORS.USER_ALREADY_EXISTS);
        expect(err.message).to.be.equal('Username or email already exist');
      }
    });
  });
});