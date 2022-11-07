const express = require('express')
const { createTransaction, getTransactions, updateTransaction, deleteTransaction } = require('../controllers/transaction')
const { schemaValidator } = require("../middlewares/validateHelper")
const { updateTransactionSchema } = require("../schemas/transactions")
// const {} = require("../middlewares")
// const {} = require("../schemas")

const router = express.Router()

// example of a route with index controller get function
router.post('/', createTransaction)
router.get('/', getTransactions)
router.put('/:id', schemaValidator(updateTransactionSchema), updateTransaction)
router.delete('/:id', deleteTransaction)
module.exports = router

