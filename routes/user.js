const express = require('express')
const { get, createUser } = require('../controllers/user')


const {createUserValidator} = require("../schemas/createUser.Schema")

const router = express.Router()

// example of a route with index controller get function
router.get('/', get)
router.post('/', createUserValidator, createUser)

module.exports = router