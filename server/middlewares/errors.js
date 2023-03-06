const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  return res.status(err.statusCode).json({
    status: false,
    error: err,
    errorMessage: err.message,
    stack: err.stack,
  });
};
