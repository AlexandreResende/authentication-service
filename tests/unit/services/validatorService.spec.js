const Joi = require('joi');
const { faker } = require('@faker-js/faker');

const ValidatorService = require('../../../src/services/validatorService');

describe('Unit test', function() {
  describe('ValidatorService', function() {
    it('returns an empty array when no errors were found', function() {
      const validatorService = new ValidatorService();
      const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required()
      });
      const input = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      };

      const result = validatorService.validate(input, schema);

      expect(result).to.be.deep.equal([]);
    });

    it('returns an array with validation errors', function() {
      const validatorService = new ValidatorService();
      const schema = Joi.object({
        email: Joi.string().email().required()
      });
      const input = {
        email: faker.person.fullName(),
      };

      const result = validatorService.validate(input, schema);

      expect(result).to.be.deep.equal(["\"email\" must be a valid email"]);
    });
  });
});