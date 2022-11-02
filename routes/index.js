const express = require('express')
const { get } = require('../controllers/index')
const userRouter = require('./user')


const router = express.Router()

// example of a route with index controller get function
router.get('/', get)

router.use('/users', userRouter)

module.exports = router
