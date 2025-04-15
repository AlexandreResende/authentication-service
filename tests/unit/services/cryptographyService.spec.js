const chai = require('chai');
const { faker } = require('@faker-js/faker');

const TokenService = require('../../../src/services/tokenService');
const CryptographyService = require('../../../src/services/cryptographyService');

const expect = chai.expect;

describe('Cryptography service', function() {
  describe('Cipher method', function() {
    it('ciphers a string', function() {
      const cryptographyService = new CryptographyService();
      const word = faker.lorem.word();

      const result = cryptographyService.cipher(word);

      expect(result).to.be.not.equal(word);
    });
  });

  describe('Decipher method', function() {
    it('deciphers an encrypted string', function() {
      const cryptographyService = new CryptographyService();
      const word = faker.lorem.word();

      const cipheredWord = cryptographyService.cipher(word);
      const decipheredWord = cryptographyService.decipher(cipheredWord)

      expect(decipheredWord).to.be.equal(word);
    });
  });
});
