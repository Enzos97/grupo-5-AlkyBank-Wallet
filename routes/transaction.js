const express = require('express')

const {createTransaction, getTransactions, updateTransaction, getTransactionsQuery, transactionData } = require('../controllers/transaction')
const { schemaValidator } = require("../middlewares/validateHelper")
const { updateTransactionSchema, newTransaction } = require("../schemas/transactions")
// const {} = require("../middlewares")
// const {} = require("../schemas")

const router = express.Router()

// example of a route with index controller get function

router.post('/', schemaValidator(newTransaction), createTransaction)
router.get('/:id', transactionData)
router.get('/', getTransactions)
router.get('/',getTransactionsQuery)
router.put('/:id',schemaValidator(updateTransactionSchema),updateTransaction)

module.exports = router

