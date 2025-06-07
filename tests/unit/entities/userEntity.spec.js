const { expect } = require('chai');
const { faker } = require('@faker-js/faker');

const SCOPES = require('../../../src/enums/scopes');
const userEntityFactory = require('../../mocks/UserEntityFactory');

describe('Unit test', function () {
  describe('User entity', function() {
    describe('toJson method', function() {
      it('return an object with pre-defined fields', function() {
        const user = userEntityFactory({ scopes: SCOPES.DEFAULT });
        const result = user.toJson();

        expect(typeof result).to.be.equal('object');
        expect(result.id).to.not.be.undefined;
        expect(result.fullName).to.not.be.undefined;
        expect(result.username).to.not.be.undefined;
        expect(result.email).to.not.be.undefined;
        expect(result.password).to.not.be.undefined;
        expect(result.scopes).to.not.be.undefined;
        expect(result.createdAt).to.not.be.undefined;
        expect(result.updatedAt).to.not.be.undefined;
      });
    });

    describe('removeScopes method', function() {
      it('removes the scope requested', function() {
        const user = userEntityFactory({ scopes: SCOPES.DEFAULT });
        
        user.removeScopes([SCOPES.DEFAULT]);

        expect(user.scopes.length).to.be.equal(0);
      });
    });
  });
});