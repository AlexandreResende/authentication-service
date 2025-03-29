const express = require('express');

const { PORT } = require('./src/environments');

const app = express();


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});

module.exports = app;
