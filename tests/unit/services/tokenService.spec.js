const chai = require('chai');

const TokenService = require('../../../src/services/tokenService');

const expect = chai.expect;

describe('Token service', function() {
  describe('Validate method', function() {});

  describe('Generate method', function() {
    it('generates a jwt token', function() {
      const tokenService = new TokenService();
      const data = {
        username: 'OzSMjooblm',
        age: 23,
        category: 'user',
      };

      const token = tokenService.generate(data);

      expect(typeof token).to.be.equal('string');
      expect(token.length).to.be.greaterThan(0);
    });

    it('throws an error when data is not passed', function() {
      const tokenService = new TokenService();
      const data = undefined;

      try {
        tokenService.generate(data)
      } catch (err) {
        expect(err.message).to.be.equal('payload is required');
      }
    });
  });
});
