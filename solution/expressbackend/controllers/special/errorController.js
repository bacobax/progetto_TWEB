/**
 * This is a middleware function that handles errors in the application.
 * It takes an error, request, response, and next function as parameters.
 * The function sets the status code of the error to 500 if it is not already set.
 * It also sets the status of the error to 'error' if it is not already set.
 * The function then logs the error to the console and sends a response with the status code, status, and message of the error.
 *
 * @param {Object} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 */
module.exports = (err, req, res, next) => {
  // set locals, only providing error in development
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  console.error(err);

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};