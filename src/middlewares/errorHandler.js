const ERRORS = require('../enums/errors');

const errorToStatusCode = {
  [ERRORS.NOT_FOUND]: 404,
  [ERRORS.INVALID_PASSWORD]: 409,
  [ERRORS.USER_ALREADY_EXISTS]: 409,
};

const errorHandler = (controller) => async (req, res, next) => {
  try {
    await controller.handleRequest(req, res);

    next();
  } catch (err) {
    const errorCode = err.errorCode;
    const statusCode = errorToStatusCode[errorCode] ?? 500;

    if (statusCode === 500) console.log(JSON.stringify(err));

    const message = statusCode === 500 ? 'Internal server error' : err.message;
    
    return res.status(statusCode).json({ message });
  }
};

module.exports = errorHandler;
