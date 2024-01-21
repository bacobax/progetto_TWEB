/**
 * Error handling middleware for Express.js applications.
 *
 * @module
 * @param {Object} err - The error object, usually provided by a previous middleware or route handler.
 * @param {Object} req - The Express.js request object.
 * @param {Object} res - The Express.js response object.
 * @param {Function} next - The next middleware function in the Express.js request-response cycle.
 * @returns {Object} The Express.js response object with the status code and the error message.
 */
module.exports = (err, req, res, next) => {
  // Set the status code of the error, defaulting to 500 if not already set
  err.statusCode = err.statusCode || 500;

  // Set the status of the error, defaulting to 'error' if not already set
  err.status = err.status || 'error';

  // Send the error response
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};