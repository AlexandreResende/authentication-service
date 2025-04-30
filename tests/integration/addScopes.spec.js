const { faker } = require('@faker-js/faker');
const sinon = require('sinon');
const request = require('supertest');

const app = require('../../index');
const userEntityFactory = require('../mocks/UserEntityFactory');
const UserRepository = require('../../src/repository/userRepository');
const SCOPES = require('../../src/enums/scopes');

describe('Integration test', function() {
  describe('AddScopes', function() {
    this.afterEach(() => {
      sinon.restore();
    })

    it('adds scopes successfully to user when user exists', function(done) {
      const userId = faker.number.int({ min: 1 });
      const scopes = [SCOPES.DEFAULT];

      const user = userEntityFactory({ id: userId });

      sinon.stub(UserRepository.prototype, 'findById').resolves(user);
      sinon.stub(UserRepository.prototype, 'updateScopes').resolves();

      request
        .agent(app)
        .patch(`/users/scopes/${userId}`)
        .send({ scopes })
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.be.equal('Scopes added successfully');

          done();
        });
    });

    it('returns a not found error when user does not exist', function(done) {
      const userId = faker.number.int({ min: 1 });
      const scopes = [SCOPES.DEFAULT];

      const user = userEntityFactory({ id: userId });

      sinon.stub(UserRepository.prototype, 'findById').resolves(null);

      request
        .agent(app)
        .patch(`/users/scopes/${userId}`)
        .send({ scopes })
        .expect(404)
        .end((err, res) => {
          expect(res.body.message).to.be.equal('User not found');

          done();
        });
    });

    it('returns a bad request when invalid scope is passed', function(done) {
      const userId = faker.number.int({ min: 1 });
      const invalidScope = faker.lorem.word();
      const scopes = [invalidScope];

      request
        .agent(app)
        .patch(`/users/scopes/${userId}`)
        .send({ scopes })
        .expect(400)
        .end((err, res) => {
          expect(res.body.message).to.be.equal('Invalid scopes');
          expect(res.body.scopes).to.be.deep.equal(scopes);

          done();
        });
    });
  });
});