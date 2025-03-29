const sinon = require('sinon');
const chai = require('chai');
const request = require('supertest');

const app = require('../../index');

const expect = chai.expect;

describe('HealthCheck endpoint', function() {
  it('returns OK when service is up and running', function(done) {
    request
      .agent(app)
      .get('/health-check')
      .send()
      .expect(200)
      .end((err, res) => {

        expect(err).to.be.equal(null);
        expect(res.status).to.be.equal(200);

        done();
      });
  });
});
