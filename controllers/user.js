const createHttpError = require('http-errors')
const { User } = require('../database/models')
const { ErrorObject } = require('../helpers/error')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { genSaltSync, hashSync } = require('bcrypt')

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
    createUser: catchAsync(async (req, res, next) => {
        try {
            const { firstname, lastname, email, password } = req.body
            if (!firstname || !lastname || !email || !password)
                throw new Error('Not all fields have been entered.')
            const existUser = await User.findOne({ where: { email } })
            if (existUser)
                throw new Error('Email already exists.')
            const hashPassword = hashSync(password, genSaltSync(10))
            if (!hashPassword) throw new Error('Could not hash the password.')
            const response = await User.create({
                firstName: firstname,
                lastName: lastname,
                password: hashPassword,
                email,
            })
            if (!response) throw new Error('Could not create the user.')
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
    userData: catchAsync(async (req, res, next) => {
        try {
            const { id } = req.params
            const response = await User.findByPk(id)
            if (!response) throw new ErrorObject('User not found.', 404)
            endpointResponse({
                res,
                message: 'User data retrieved successfully',
                body: response,
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving user data] - [user - GET]: ${error.message}`,
            )
            next(httpError)
        }
    }),
    deletedUser: catchAsync(async (req, res, next) => {
        try {
            const { id } = req.params
            const response = await User.findByPk(id)
            if (!response) throw new ErrorObject('the id doest not exist', 404)
            await response.destroy()
            endpointResponse({
                res,
                message: 'User eliminated retrieved successfully',
                body: response,
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving user data] - [user - GET]: ${error.message}`,
            )
            next(httpError)
        }
    })
}
