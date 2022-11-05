const express = require('express')
const {getTransactions, deleteTransaction } = require('../controllers/transaction')

// const {} = require("../middlewares")
// const {} = require("../schemas")

const router = express.Router()

// example of a route with index controller get function
router.get('/', getTransactions)
router.delete('/:id', deleteTransaction)


module.exports = router