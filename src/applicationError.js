class ApplicationError extends Error {
  constructor(errorCode, message) {
    super(errorCode);

    this.errorCode = errorCode;
    this.message = message
  }
}

module.exports = ApplicationError;
