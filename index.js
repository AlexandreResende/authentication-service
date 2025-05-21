require('./src/di');
const express = require('express');
const assert = require('assert');
const swaggerUi = require('swagger-ui-express');

const { PORT, CRYPTOGRAPHY } = require('./src/environments');
const swaggerDocument = require('./swagger-output.json');

const healthcheckRouter = require('./src/routers/healthcheckRouter');
const userRouter = require('./src/routers/userRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('', healthcheckRouter);
app.use('', userRouter);

app.listen(PORT, () => {
  assert(CRYPTOGRAPHY.IV, 'IV key from Cryptography service can not be empty.');
  assert(CRYPTOGRAPHY.SECRET, 'Secret key from Cryptography service can not be empty.');
  
  console.log(`Server running on port ${PORT}.`);
});

module.exports = app;
