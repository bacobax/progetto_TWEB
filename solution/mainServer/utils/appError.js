/**
 * @class AppError
 * @extends Error
 * @param {string} message - Error message
 * @param {number} statusCode - Error status code
 * @returns {Object} AppError
 * @example
 * throw new AppError('This is an error message', 404);
 * @example
 * next(new AppError('This is an error message', 404));
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
