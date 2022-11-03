const { catchAsync } = require('../helpers/catchAsync')
const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')

const {Transaction} = require("../database/models")

module.exports = {
    getTransactions:catchAsync(async(req,res,next)=>{
        try {
            console.log("HOLAAAAAAAAAAAAAAAAAAAAA")
            const response = await Transaction.findAll()
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