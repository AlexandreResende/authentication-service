const { faker } = require('@faker-js/faker');
const request = require('supertest');
const sinon = require('sinon');

const app = require('../../index');
const UserRepository = require('../../src/repository/userRepository');

describe('Integration test', function() {
  describe('Update password', function() {
    this.afterEach(() => {
      sinon.restore();
    });

    it('updates the user password', function(done) {
      const id = faker.number.int({ min: 1 });
      const password = faker.internet.password();

      sinon.stub(UserRepository.prototype, 'update').resolves();

      request
        .agent(app)
        .patch(`/users/${id}`)
        .send({ password })
        .expect(200)
        .end((err, res) => {

          expect(err).to.be.equal(null);
          expect(res.body.message).to.be.equal('User password updated' );

          done();
        });
    });
  });
});