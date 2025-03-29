const express = require('express');

const { PORT } = require('./src/environments');

const healthcheckRouter = require('./src/routers/healthcheckRouter');

const app = express();

app.use('', healthcheckRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});

module.exports = app;
