const express = require('express')
const { get, editCategory } = require('../controllers/category')

const router = express.Router()

// example of a route with index controller get function
router.get('/', get)
router.put('/:id', editCategory)

module.exports = router