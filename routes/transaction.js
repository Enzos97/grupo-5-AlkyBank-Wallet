const express = require('express')
const { createTransaction,transactionData } = require('../controllers/transaction')
const { schemaValidator } = require('../middlewares/validateHelper')
const { newTransaction } = require('../schemas/transactionNew')

const router = express.Router()

// example of a route with index controller get function
router.post('/', schemaValidator(newTransaction), createTransaction)
router.get('/:id', transactionData)


module.exports = router