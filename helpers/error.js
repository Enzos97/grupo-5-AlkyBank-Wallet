class ErrorObject extends Error {
  constructor(message, statusCode, errors = []) {
/* The above code is creating a new class called AppError. This class is a child of the Error class.
The constructor function is called when a new instance of the class is created. The constructor
function takes in a message, statusCode, status, isOperational, and errors. The message, statusCode,
and errors are passed in as parameters. The status is set to 'fail' if the statusCode starts with a
4, otherwise it is set to 'error'. The isOperational is set to true. The
Error.captureStackTrace(this, this.constructor */
    super()

    this.message = message
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    this.isOperational = true
    this.errors = errors

    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = {
  ErrorObject,
}
