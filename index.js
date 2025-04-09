require('./src/di');
const express = require('express');

const { PORT } = require('./src/environments');

const healthcheckRouter = require('./src/routers/healthcheckRouter');
const authenticationRouter = require('./src/routers/authenticationRouter');

const app = express();

app.use('', healthcheckRouter);
app.use('', authenticationRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});

module.exports = app;
