require('dotenv').config();

const ENVIRONMENT = {
  PORT: process.env.PORT || 3000,
  TOKEN: {
    SECRET: process.env.TOKEN_SECRET || 'abc123',
    EXPIRATION_TIME: 3600 // 1 hour
  },
};

module.exports = ENVIRONMENT;
