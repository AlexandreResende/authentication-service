const express = require('express');
const AuthenticationController = require('../controllers/authenticationController');

const authenticationRouter = express.Router();

authenticationRouter
  .post('/token/authenticate', new AuthenticationController().authenticate);

module.exports = authenticationRouter;
