const express = require('express')
const { get, post } = require('../controllers/user')

const router = express.Router()

// example of a route with index controller get function
router.get('/', get)
router.post('/', post)

module.exports = router