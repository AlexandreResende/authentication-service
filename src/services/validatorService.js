const Joi = require('joi');

class ValidatorService {
  constructor() {}

  validate(input, schema) {
    const validationResult = schema.validate(input, { abortEarly: false });

    if (validationResult.error) {
      const errors = validationResult.error.details.map(errorDetail => {
        return errorDetail.message;
      });

      return errors;
    }

    return [];
  }
}

module.exports = ValidatorService;
