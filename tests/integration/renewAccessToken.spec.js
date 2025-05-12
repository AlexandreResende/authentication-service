const { faker } = require('@faker-js/faker');
const request = require('supertest');
const sinon = require('sinon');

const app = require('../../index');
const UserRepository = require('../../src/repository/userRepository');
const TokenService = require('../../src/services/tokenService');
const userEntityFactory = require('../mocks/UserEntityFactory');

describe('Integration tests', function() {
  describe('RenewAccessToken', function() {
    const tokenService = new TokenService();

    afterEach(() => {
      sinon.restore();
    });

    it('renews the access token of the user', function(done) {
      const userId = faker.number.int({ min: 1 });
      const refreshToken = tokenService.generateRefreshToken({ id: userId });
      const user = userEntityFactory({ id: userId, refreshToken });

      sinon.stub(UserRepository.prototype, 'findById').resolves(user);
      sinon.stub(UserRepository.prototype, 'update').resolves();

      request
        .agent(app)
        .post('/refresh')
        .send({ token: refreshToken })
        .expect(200)
        .end((_, res) => {
          const result = res.body;

          expect(result.message).to.be.equal('Success');
          expect(result.access_token).to.be.not.equal(undefined);
          expect(typeof result.access_token).to.be.equal('string');
          expect(result.refresh_token).to.be.not.equal(undefined);
          expect(typeof result.refresh_token).to.be.equal('string');

          done();
        });
    });

    it('returns a bad request when refresh token passed is not a string', function(done) {
      request
        .agent(app)
        .post('/refresh')
        .send({ token: faker.number.int() })
        .expect(400)
        .end((_, res) => {
          const result = res.body;

          expect(result.message).to.be.deep.equal(['\"token\" must be a string']);

          done();
        });
    });

    it('returns a bad request when token is not passed', function(done) {
      request
        .agent(app)
        .post('/refresh')
        .send({})
        .expect(400)
        .end((_, res) => {
          const result = res.body;

          expect(result.message).to.be.deep.equal(['\"token\" is required']);

          done();
        });
    });

    it('returns a not found when user does not exist', function(done) {
      const userId = faker.number.int({ min: 1 });
      const refreshToken = tokenService.generateRefreshToken({ id: userId });

      sinon.stub(UserRepository.prototype, 'findById').resolves(null);

      request
        .agent(app)
        .post('/refresh')
        .send({ token: refreshToken })
        .expect(404)
        .end((_, res) => {
          const result = res.body;

          expect(result.message).to.be.equal('User not found');

          done();
        });
    });

    it('returns a general error when token could not be decoded', function(done) {
      const refreshToken = faker.lorem.word();

      request
        .agent(app)
        .post('/refresh')
        .send({ token: refreshToken })
        .expect(500)
        .end((_, res) => {
          const result = res.body;

          expect(result.message).to.be.equal('Internal server error');

          done();
        });
    });

    it('returns a general error when refresh tokens do not match', function(done) {
      const userId = faker.number.int({ min: 1 });
      const refreshToken = tokenService.generateRefreshToken({ id: 1000 });
      const anotherRefreshToken = tokenService.generateRefreshToken({ id: userId });
      const user = userEntityFactory({ id: userId, refreshToken });

      sinon.stub(UserRepository.prototype, 'findById').resolves(user);

      request
        .agent(app)
        .post('/refresh')
        .send({ token: anotherRefreshToken })
        .expect(500)
        .end((_, res) => {
          const result = res.body;

          expect(result.message).to.be.equal('Internal server error');

          done();
        });
    });
  });
});