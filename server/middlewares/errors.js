const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  return res.status(err.statusCode).json({
    status: false,
    error: err,
    errorMessage: err.message,
    stack: err.stack,
  });
//   if (process.env.NODE_ENV === "DEVELOPMENT") {
//     return res.status(err.statusCode).json({
//       status: false,
//       error: err,
//       errorMessage: err.message,
//       stack: err.stack,
//     });
//   }
//   if (process.env.NODE_ENV === "PRODUCTION") {
//     let error = { ...err };
//     error.message = err.message;

//     // wrongo mongoose object ID error
//     if(err.name === 'CastError'){
//       const message= `Resource not found. Invalid: ${err.path}`
//       error = new ErrorHandler(message, 400)
//     }

//     return res.status(err.statusCode).json({
//       status: false,
//       errorMessage: error.message || "Internal Server Error",
//     });
//   }
//   next();
};
