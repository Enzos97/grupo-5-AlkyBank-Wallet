const { validationResult , checkSchema } = require("express-validator");

const createHttpError = require('http-errors')

exports.schemaValidator = (schema) => [
    checkSchema(schema),
    (req, res, next) => {
      try {
        validationResult(req).throw()
        return next()
      } catch (error) {
        const mappedErrors = error.mapped()
        const errorMessages = Object.values(mappedErrors).map((error) => error.msg)
        const httpError = createHttpError(
          400,
          `[Error on data validation] - [${(req.baseUrl).slice(1)} - ${req.method}]: ${errorMessages}`,
        )
        return next(httpError)
      }
    },
  ]

