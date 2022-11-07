const createHttpError = require('http-errors')
const { Transaction, User, Category } = require('../database/models')
const { ErrorObject } = require('../helpers/error')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')



module.exports = {
    createTransaction: catchAsync(async (req, res, next) => {
        try {
            const { description, amount, userId, categoryId } = req.body
            const idUser = await User.findByPk(userId)
            const idCategory = await Category.findByPk(categoryId)
            if(!idUser) throw new ErrorObject('invalid id user!',404)
            if(!idCategory) throw new ErrorObject('invalid id Category!',404)
            const newTransaction = await Transaction.create({
                description,
                amount,
                userId: idUser.id,
                categoryId: idCategory.id
            })
            endpointResponse({
                res,
                message: 'transaction completed successfully',
                body: newTransaction,
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode, `[Error retrieving index] - [transaction - POST]: ${error.message}`,
            )
            next(httpError)
        }
    }),
    getTransactions: catchAsync(async (req, res, next) => {
        try {
            const response = await Transaction.findAll()
            if (!response) {
                throw new ErrorObject("Cant do the action", 500)
            }
            endpointResponse({
                res,
                message: "Transactions retrieved successfully",
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode, `[Error retrieving index] - [index - GET]: ${error.message}`,
                `[Error retrieving index] - [transactions - GET]: ${error.message}`,
            )
            next(httpError)
        }
    }),
    getTransactionsQuery: catchAsync(async(req,res,next)=>{
        try {
            const {idUser} = req.query
            const {id} = req.user.id
            let response;
            if(id===parseInt(idUser) || req.user.roleId===1){
                response = await Transaction.findAll({where:{userId:idUser}})
            }
            if(!response){
                throw new ErrorObject("Cant do the action",500)
            }
            endpointResponse({
                res,
                message:"Transactions retrieved successfully",
                body:response
            })
        }catch (error) {
            const httpError = createHttpError(
            error.statusCode,`[Error retrieving index] - [index - GET]: ${error.message}`,
                `[Error retrieving index] - [transactions - GET]: ${error.message}`,
            )
            next(httpError)
        }
    }),
    transactionData: catchAsync(async(req,res,next)=>{
        try {
            const id = req.params.id
            const response = await Transaction.findByPk(id)
            if(!response){
                throw new ErrorObject("transaction not found",404)
            }
            endpointResponse({
                res,
                message:"Transaction retrieved successfully",
                body:response
            })
        }catch (error) {
            const httpError = createHttpError(
            error.statusCode,`[Error retrieving transaction] - [transactionData - GET]: ${error.message}`,
         )
            next(httpError)
        }
    }),
    updateTransaction:catchAsync(async(req,res,next)=>{
        try {
            const { id } = req.params
            const { userId, category, amount, date } = req.body

            const transaction = await Transaction.findByPk(id);
            const user = await User.findByPk(userId)

            if(!transaction) throw new ErrorObject('Transaction not found.', 404)
            if(!user) throw new ErrorObject('User  not found.', 404)
    
            const response = await Transaction.update({
                userId,
                category,
                amount,
                date: new Date(date)
            }, {
                where: { id: id }
            });
            endpointResponse({
                res,
                message: "Transaction updated successfully",
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving index] - [index - PUT]: ${error.message}`,
                `[Error retrieving index] - [transactions - PUT]: ${error.message}`,
            )
            next(httpError)
        }
    }),
    deleteTransaction: catchAsync(async (req, res, next) => {
        try {
            const { id } = req.params
            const response = await Transaction.destroy({ where: { id } })
            if (!response) {
                throw new ErrorObject("the id doest not exit", 500)
            }
            endpointResponse({
                res,
                message: "Transactions deleted retrieved successfully",
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode, `[Error retrieving index] - [index - GET]: ${error.message}`,
                `[Error retrieving index] - [transactions - GET]: ${error.message}`,
            )
            next(httpError)
        }
    })
}

