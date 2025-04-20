require('./src/di');
const express = require('express');

const { PORT } = require('./src/environments');

const healthcheckRouter = require('./src/routers/healthcheckRouter');
const authenticationRouter = require('./src/routers/authenticationRouter');
const userRouter = require('./src/routers/userRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('', healthcheckRouter);
app.use('', authenticationRouter);
app.use('', userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});

module.exports = app;
