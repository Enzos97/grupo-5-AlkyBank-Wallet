const { catchAsync } = require('../helpers/catchAsync')
const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')

const {Transaction} = require("../database/models")
const { ErrorObject } = require('../helpers/error')

module.exports = {
    getTransactions:catchAsync(async(req,res,next)=>{
        try {
            const response = await Transaction.findAll()
            if(!response){
                throw new ErrorObject("Cant do the action",500)
            }
            endpointResponse({
                res,
                message:"Transactions retrieved successfully",
                body:response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving index] - [transactions - GET]: ${error.message}`,
            )
            next(httpError)
        }
    })
}