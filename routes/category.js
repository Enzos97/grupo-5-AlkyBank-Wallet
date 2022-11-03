const express = require('express')
const { get, getById } = require('../controllers/category')

const router = express.Router()

// example of a route with index controller get function
router.get('/', get)
router.get('/:id', getById)

module.exports = router