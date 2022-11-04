const express = require('express')
const { get } = require('../controllers/index')

const categoryRouter = require('./category')
const userRouter = require('./user')
const authRouter = require('./auth')

const router = express.Router()

// example of a route with index controller get function
router.get('/', get)

router.use('/categories',categoryRouter)
router.use('/users', userRouter)
router.use('/auth', authRouter)


module.exports = router
