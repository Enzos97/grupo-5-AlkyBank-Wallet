const createHttpError = require('http-errors')
const { User } = require('../database/models')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

// example of a controller. First call the service, then build the controller method
module.exports = {
    get: catchAsync(async (req, res, next) => {
        try {
            const response = await User.findAll()
            endpointResponse({
                res,
                message: 'User retrieved successfully',
                body: response,
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving index] - [index - GET]: ${error.message}`,
            )
            next(httpError)
        }
    }),
    post: catchAsync(async (req, res, next) => {
        try {
            const { firstname, lastname, email, password } = req.body
            if (!firstname || !lastname || !email || !password)
                throw new Error('Not all fields have been entered.')
            const existUser = await User.findOne({ where: { email } })
            if (existUser)
                throw new Error('An account with this email already exists.')
            const response = await User.create(req.body)
            endpointResponse({
                res,
                message: 'User created successfully',
                body: response,
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error creating user] - [user - POST]: ${error.message}`,
            )
            next(httpError)
        }
    }),
}
