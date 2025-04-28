const { faker } = require('@faker-js/faker');
const sinon = require('sinon');
const request = require('supertest');

const app = require('../../index');
const userEntityFactory = require('../mocks/UserEntityFactory');
const UserRepository = require('../../src/repository/userRepository');

describe('Integration test', function() {
  describe('RemoveScopes', function() {
    this.afterEach(() => {
      sinon.restore();
    })

    it('removes scopes successfully to user when user exists', function(done) {
      const userId = faker.number.int({ min: 1 });
      const scopes = [faker.lorem.word(), faker.lorem.word() ];

      const user = userEntityFactory({ id: userId });

      sinon.stub(UserRepository.prototype, 'findById').resolves(user);
      sinon.stub(UserRepository.prototype, 'updateScopes').resolves();

      request
        .agent(app)
        .patch(`/users/scopes/remove/${userId}`)
        .send({ scopes })
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.be.equal('Scopes removed');

          done();
        });
    });

    it('returns a not found error when user does not exist', function(done) {
      const userId = faker.number.int({ min: 1 });
      const scopes = [faker.lorem.word(), faker.lorem.word() ];

      const user = userEntityFactory({ id: userId });

      sinon.stub(UserRepository.prototype, 'findById').resolves(null);

      request
        .agent(app)
        .patch(`/users/scopes/remove/${userId}`)
        .send({ scopes })
        .expect(404)
        .end((err, res) => {
          expect(res.body.message).to.be.equal('User not found');

          done();
        });
    });
  });
});