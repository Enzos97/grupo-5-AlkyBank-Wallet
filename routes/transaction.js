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
router.get('/', auth, getTransactions)
router.get('/:id', auth, transactionData)
router.get('/', auth, isOwnership, getTransactionsQuery)
router.post('/', auth, schemaValidator(newTransaction), createTransaction)
router.put('/:id', auth,schemaValidator(updateTransactionSchema),updateTransaction)
router.delete('/:id', auth, deleteTransaction)

module.exports = router

