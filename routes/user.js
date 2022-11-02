const express = require('express')
const { get, createUser } = require('../controllers/user')

const router = express.Router()

// example of a route with index controller get function
router.get('/', get)
router.post('/', createUser)

module.exports = router