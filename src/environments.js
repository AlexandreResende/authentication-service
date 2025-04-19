require('dotenv').config();

const ENVIRONMENT = {
  PORT: process.env.PORT || 3000,
  TOKEN: {
    SECRET: process.env.TOKEN_SECRET || 'abc123',
    ACCESS_TOKEN_EXPIRATION_TIME: 3600, // 1 hour
    REFRESH_TOKEN_EXPIRATION_TIME: 86400, // 1 day
  },
  CRYPTOGRAPHY: {
    SECRET: process.env.CRYPTO_SECRET,
    IV: process.env.IV,
  }
};

module.exports = ENVIRONMENT;
