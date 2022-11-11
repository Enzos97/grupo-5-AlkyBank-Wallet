const express = require('express')

const { createTransaction, getTransactions, updateTransaction, deleteTransaction, getTransactionsQuery, transactionData } = require('../controllers/transaction')
const { auth } = require('../middlewares/authUser')
const { isOwnership } = require('../middlewares/ownership')
const { schemaValidator } = require("../middlewares/validateHelper")
const { updateTransactionSchema, newTransaction } = require("../schemas/transactions")
// const {} = require("../middlewares")
// const {} = require("../schemas")

const router = express.Router()

// example of a route with index controller get function
router.get('/', getTransactions)
router.get('/:id', transactionData)
router.get('/', auth, isOwnership, getTransactionsQuery)
router.post('/', schemaValidator(newTransaction), createTransaction)
router.put('/:id',schemaValidator(updateTransactionSchema),updateTransaction)
router.delete('/:id', deleteTransaction)

module.exports = router

