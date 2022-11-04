// @ts-nocheck
const createHttpError = require('http-errors')
const { Category } = require('../database/models')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { ErrorObject } = require('../helpers/error')

// example of a controller. First call the service, then build the controller method
module.exports = {
    //Return All categorias by name and id
    get: catchAsync(async (req, res, next) => {
        try {
            const response = await Category.findAll({
                attributes: ['id','name']
            });
            endpointResponse({
                res,
                message: "Categories retrieved successfully",
                body: response,
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving category] - [category - GET]: ${error.message}`,
            )
            next(httpError)
        }
    }),
    //Return one category by Id
    getById: catchAsync(async (req, res, next) => {
        try {
            const {id} = req.params
            const response = await Category.findByPk(id)
            if(!response) throw new ErrorObject('Category not found.', 404)
            endpointResponse({
                res,
                message: "Category retrieved successfully",
                body: response,
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving category] - [category - GET]: ${error.message}`,
            )
            next(httpError)
        }
    }),
    editCategory: catchAsync(async (req, res, next) => {
        try {
            const {id} = req.params
            const {name, description} = req.body
            const response = await Category.update({
                name,
                description
            },{
                where: {id: id}
            });
            // @ts-ignore
            endpointResponse({
                res,
                message: "Category updated successfully",
                body: response,
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error Updating Category] - [Category - PUT]: ${error.message}`,
            )
            next(httpError)
        }
    }),
}