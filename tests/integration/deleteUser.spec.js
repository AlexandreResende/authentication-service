const { faker } = require('@faker-js/faker');
const sinon = require('sinon');
const request = require('supertest');

const app = require('../../index');
const UserRepository = require('../../src/repository/userRepository');

describe('Integration Test', function() {
  describe('Delete User', function() {
    this.afterEach(() => {
      sinon.restore();
    });

    it('deletes a user when a valid user id is passed', function(done) {
      const userId = faker.number.int({ min: 1 });

      sinon.stub(UserRepository.prototype, 'delete').resolves();

      request
        .agent(app)
        .delete(`/users/${userId}`)
        .expect(200)
        .end((err, res) => {
          expect(err).to.be.equal(null);
          expect(res.body.message).to.be.equal('User deleted successfully');

          done();
        });
    });
  });
});