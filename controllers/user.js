const createHttpError = require('http-errors')
const { User } = require('../database/models')
const { ErrorObject } = require('../helpers/error')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { genSaltSync, hashSync, compareSync } = require('bcrypt')
const { usersPagination } = require('../helpers/pagination')
const { encode } = require('../helpers/jwt')

// example of a controller. First call the service, then build the controller method
module.exports = {
    get: catchAsync(async (req, res, next) => {
        try {
            const response = await User.findAll({
                attributes: ['id', 'firstName', 'lastName', 'email', 'createdAt']
            })
            let results
            if(!req.query.page){
                results =  usersPagination(response, 1, 10)
            }else{
                results =  usersPagination(response, parseInt(req.query.page), 10)
            }
            endpointResponse({
                res,
                message: 'User retrieved successfully',
                body: results
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving index] - [index - GET]: ${error.message}`,
            )
            next(httpError)
        }
    }),
    login: catchAsync(async (req, res, next) => {
        try {
            const { email, password } = req.body
            const response = await User.findOne({ where: { email } })
            if (!response)throw new ErrorObject('{ok: false}', 404)
            const passwordMatch = compareSync(password, response.password)
            if (!passwordMatch)throw new ErrorObject('{ok: false}', 401)
            const token = encode(response,'user')
            endpointResponse({
                res,
                message: 'User logged successfully',
                body: {response,token},
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error logging in] - [login - POST]: ${error.message}`,
            )
            next(httpError)
        }
    }),
    createUser: catchAsync(async (req, res, next) => {
        try {
            
            const { firstName, lastName, email, password } = req.body
            const existUser = await User.findOne({ where: { email } })
            if (existUser)
                throw new ErrorObject('User already exist.', 409)
            const hashPassword = hashSync(password, genSaltSync(10))
            if (!hashPassword) throw new Error('Could not hash the password.')
            const response = await User.create({
                firstName,
                lastName,
                password: hashPassword,
                email,
                avatar:`${req.protocol}://${req.get('host')}/uploads/` +  req.file?.originalname
                // `${req.protocol}://${req.get('host')}${req.originalUrl}` +
                //"http://localhost:3001/uploads/"
            })
            if (!response) throw new ErrorObject('Could not create the user.', 500)
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
            const response = await User.findByPk(id, {
                attributes: ['id', 'firstName', 'lastName', 'email', 'roleId', 'avatar', 'createdAt']
            })
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
            const response = await User.destroy({ where: { id: id } })
            if (!response) throw new ErrorObject('the id doest not exist', 404)
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
    }),

    editUser: catchAsync(async (req, res, next) => {
        try {

            const { id } = req.params
            const user = await User.findOne({ where: { id } })
            if (!user) throw new ErrorObject('the user doest not exist', 404)

            const { firstName, lastName, email, password } = req.body

            const response = await User.update({
                firstName,
                lastName,
                email
            },
                {
                    where: { id: id }
                })
            endpointResponse({
                res,
                message: 'User updated successfully',
                body: response,
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving user] - [user - PUT]: ${error.message}`,
            )
            next(httpError)
        }
    }),
}
 