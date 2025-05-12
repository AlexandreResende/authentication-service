const { faker } = require('@faker-js/faker');
const sinon = require('sinon');
const request = require('supertest');

const app = require('../../index');
const userEntityFactory = require('../mocks/UserEntityFactory');
const UserRepository = require('../../src/repository/userRepository');
const CryptographyService = require('../../src/services/cryptographyService');

describe('Integration test', function() {
  describe('User login', function() {
    afterEach(() => {
      sinon.restore();
    });

    it('returns an access token and refresh token when login is successful', function(done) {
      const userData =  {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
      const encryptedPassword = new CryptographyService().cipher(userData.password);
      const userEntity = userEntityFactory({
        ...userData,
        password: encryptedPassword,
        fullName: faker.person.fullName,
        id: faker.number.int({ min: 1 }),
        createdAt: Date.now(),
        updatedAt: null,
      });

      sinon.stub(UserRepository.prototype, 'findByEmail').resolves(userEntity);
      sinon.stub(UserRepository.prototype, 'update').resolves();

      request
        .agent(app)
        .get('/users/login')
        .send(userData)
        .expect(200)
        .end((err, res) => {

          expect(err).to.be.equal(null);
          expect(typeof res.body.access_token).to.be.equal('string');
          expect(typeof res.body.refresh_token).to.be.equal('string');

          done();
        });
    });

    it('returns an bad request when email is not a valid email', function(done) {
      const userData =  {
        email: faker.lorem.word(),
        password: faker.internet.password(),
      };

      request
        .agent(app)
        .get('/users/login')
        .send(userData)
        .expect(400)
        .end((err, res) => {

          expect(err).to.be.equal(null);
          expect(res.body.message).to.be.deep.equal(["\"email\" must be a valid email"]);

          done();
        });
    });

    it('returns an bad request when password is not a string', function(done) {
      const userData =  {
        email: faker.internet.email(),
        password: faker.number.int(),
      };

      request
        .agent(app)
        .get('/users/login')
        .send(userData)
        .expect(400)
        .end((err, res) => {

          expect(err).to.be.equal(null);
          expect(res.body.message).to.be.deep.equal(["\"password\" must be a string"]);

          done();
        });
    });

    it('returns an bad request when email and password are not passed', function(done) {
      request
        .agent(app)
        .get('/users/login')
        .send({})
        .expect(400)
        .end((err, res) => {

          expect(err).to.be.equal(null);
          expect(res.body.message).to.be.deep.equal(["\"email\" is required", "\"password\" is required"]);

          done();
        });
    });

    it('returns a not found when user does not exist', function(done) {
      const userData =  {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      sinon.stub(UserRepository.prototype, 'findByEmail').resolves(null);

      request
        .agent(app)
        .get('/users/login')
        .send(userData)
        .expect(404)
        .end((err, res) => {

          expect(res.body.message).to.be.equal('User not found');

          done();
        });
    });

    it('returns a conflict when password is incorrect', function(done) {
      const userData =  {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
      const userEntity = userEntityFactory({
        ...userData,
        fullName: faker.person.fullName,
        id: faker.number.int({ min: 1 }),
        createdAt: Date.now(),
        updatedAt: null,
      });

      sinon.stub(UserRepository.prototype, 'findByEmail').resolves(userEntity);

      request
        .agent(app)
        .get('/users/login')
        .send(userData)
        .expect(409)
        .end((err, res) => {

          expect(err).to.be.equal(null);
          expect(res.body.message).to.be.equal('Invalid email or password' );

          done();
        });
    });
  });
});