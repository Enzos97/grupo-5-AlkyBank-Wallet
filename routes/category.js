const express = require('express')
const { get, getById, createCategory, editCategory } = require('../controllers/category')


const router = express.Router()

// example of a route with index controller get function
router.get('/', get)
router.put('/:id', editCategory)
router.get('/:id', getById)
router.post('/', createCategory)


module.exports = router