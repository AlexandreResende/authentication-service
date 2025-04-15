const crypto = require('crypto');

const { CRYPTOGRAPHY } = require('../environments');

class CryptographyService {
  cipher(word) {
    var cipher = crypto.createCipheriv('aes-128-cbc', CRYPTOGRAPHY.SECRET, CRYPTOGRAPHY.IV);
    var cipheredString = cipher.update(word, 'utf8', 'hex')
    cipheredString += cipher.final('hex');

    return cipheredString;
  }

  decipher(encryptedString) {
    var decipher = crypto.createDecipheriv('aes-128-cbc', CRYPTOGRAPHY.SECRET, CRYPTOGRAPHY.IV);
    var decipheredString = decipher.update(encryptedString, 'hex', 'utf8')
    decipheredString += decipher.final('utf8');

    return decipheredString;
  }
}

module.exports = CryptographyService;
