const chai = require('chai');
const { faker } = require('@faker-js/faker');

const TokenService = require('../../../src/services/tokenService');

const expect = chai.expect;

describe('Token service', function() {
  describe('Validate method', function() {
    it('throws an error when invalid token is passed', function() {
      const tokenService = new TokenService();
      const token = `
        eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI
        6Ik96U01qb29ibG0iLCJhZ2UiOjIzLCJjYXRlZ29yeSI6InVzZXI
        iLCJpYXQiOjE3NDM0NzMxMjUsImV4cCI6MTc0MzQ3NjcyNX0.N7V
        RENiJeGgIqSJLLBUAzPQByc1KV2DU6K5fGcc7Fgc
      `;

      try {
        tokenService.validate(token)
      } catch (err) {
        expect(err.message).to.be.equal('JsonWebTokenError: invalid token');
      }

    });

    it('throws an error with an expired token', function() {
      const tokenService = new TokenService();

      try {
        tokenService.validate('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik96U01qb29ibG0iLCJhZ2UiOjIzLCJjYXRlZ29yeSI6InVzZXIiLCJpYXQiOjE3NDM0NzMzOTcsImV4cCI6MTc0MzQ3Njk5N30.zYkPzWg_lV9rWorWkZOOZRubL4cv45B0m5z7PJsd8k0')
      } catch (err) {
        expect(err.message).to.be.equal('TokenExpiredError: jwt expired');
      }
    });

    it('decrypt a valid token', function() {
      const tokenService = new TokenService();
      const data = {
        username: faker.internet.username(),
        age: faker.number.int({ min: 18, max: 99 }),
        category: 'user',
      };
      const expiration = faker.number.int();

      const token = tokenService.generate(data, expiration);
      const tokenData = tokenService.validate(token);

      expect(typeof tokenData).to.be.equal('object');
      expect(tokenData.username).to.be.equal(data.username);
      expect(tokenData.age).to.be.equal(data.age);
      expect(tokenData.category).to.be.equal(data.category);
    });
  });

  describe('Generate method', function() {
    it('generates a jwt token', function() {
      const tokenService = new TokenService();
      const data = {
        username: faker.internet.username(),
        age: faker.number.int({ min: 18, max: 99 }),
        category: 'user',
      };
      const expiration = faker.number.int();

      const token = tokenService.generate(data, expiration);

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

  describe('GenerateAccessToken method', function() {
    it('generates a jwt access token', function() {
      const tokenService = new TokenService();
      const data = {
        username: faker.internet.username(),
        age: faker.number.int({ min: 18, max: 99 }),
        category: 'user',
      };

      const token = tokenService.generateAccessToken(data);

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

  describe('GenerateRefreshToken method', function() {
    it('generates a jwt refresh token', function() {
      const tokenService = new TokenService();
      const data = {
        username: faker.internet.username(),
        age: faker.number.int({ min: 18, max: 99 }),
        category: 'user',
      };

      const token = tokenService.generateRefreshToken(data);

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
