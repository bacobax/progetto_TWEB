/**
 * Takes a function with same shape of an express middleware and returns a
 * express middleware that wrap that function, so that any error that occurs in the
 * function is passed to the next middleware
 * @param fn
 * @returns {(function(*, *, *): void)|*}
 */
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
};
