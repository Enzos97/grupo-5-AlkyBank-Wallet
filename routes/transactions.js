const express = require('express')
const {getTransactions } = require('../controllers/transaction')

// const {} = require("../middlewares")
// const {} = require("../schemas")

const router = express.Router()

// example of a route with index controller get function
router.get('/', getTransactions)


module.exports = router