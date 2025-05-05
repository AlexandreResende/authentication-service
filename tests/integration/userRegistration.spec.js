const { faker } = require('@faker-js/faker');
const sinon = require('sinon');
const request = require('supertest');

const app = require('../../index');
const userEntityFactory = require('../mocks/UserEntityFactory');
const UserRepository = require('../../src/repository/userRepository');

describe('Integration test', function() {
  describe('User registration', function() {
    afterEach(() => {
      sinon.restore();
    });

    it('creates a new user when valid data is passed', function(done) {
      const userData =  {
        fullName: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        username: faker.internet.username(),
      };
      const userEntity = userEntityFactory({
        ...userData,
        id: faker.number.int({ min: 1 }),
        createdAt: Date.now(),
        updatedAt: null,
      });

      sinon.stub(UserRepository.prototype, 'findByUsernameAndEmail').resolves(null);
      sinon.stub(UserRepository.prototype, 'create').resolves(userEntity);

      request
      .agent(app)
      .post('/users/register')
      .send(userData)
      .expect(201)
      .end((err, res) => {

        expect(err).to.be.equal(null);
        expect(res.body.email).to.be.equal(userData.email);
        expect(res.body.fullName).to.be.equal(userData.fullName);
        expect(res.body.username).to.be.equal(userData.username);

        done();
      });
    });

    it('return a bad request error when body contains missing fields', function(done) {
      const userData =  {
        fullName: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      request
      .agent(app)
      .post('/users/register')
      .send(userData)
      .expect(400)
      .end((err, res) => {

        expect(err).to.be.equal(null);
        expect(res.body.message).to.be.deep.equal(["\"username\" is required"]);

        done();
      });
    });

    it('returns a conflict when username already exists', function(done) {
      const userData =  {
        fullName: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        username: faker.internet.username(),
      };
      const userEntity = userEntityFactory({
        ...userData,
        id: faker.number.int({ min: 1 }),
        createdAt: Date.now(),
        updatedAt: null,
      });

      sinon.stub(UserRepository.prototype, 'findByUsernameAndEmail').resolves(userEntity);

      request
      .agent(app)
      .post('/users/register')
      .send(userData)
      .expect(409)
      .end((err, res) => {

        expect(err).to.be.equal(null);
        expect(res.body.message).to.be.equal('Username or email already exist');

        done();
      });
    });

    it('returns a conflict when email already exists', function(done) {
      const userData =  {
        fullName: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        username: faker.internet.username(),
      };
      const userEntity = userEntityFactory({
        ...userData,
        id: faker.number.int({ min: 1 }),
        createdAt: Date.now(),
        updatedAt: null,
      });

      sinon.stub(UserRepository.prototype, 'findByUsernameAndEmail').resolves(userEntity);

      request
      .agent(app)
      .post('/users/register')
      .send(userData)
      .expect(409)
      .end((err, res) => {

        expect(err).to.be.equal(null);
        expect(res.body.message).to.be.equal('Username or email already exist');

        done();
      });
    });
  });
});