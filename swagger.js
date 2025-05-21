const swaggerAutogen = require('swagger-autogen');

const ENVIRONMENT = require('./src/environments');

const doc = {
  info: {
    title: 'Authentication service',
    description: 'Authentication service that handles user creation, login and token management'
  },
  host: `localhost:${ENVIRONMENT.PORT}`
};

const outputFile = './swagger-output.json';
const routers = ['./src/routers/healthcheckRouter.js', './src/routers/userRouter.js'];

swaggerAutogen(outputFile, routers, doc);
