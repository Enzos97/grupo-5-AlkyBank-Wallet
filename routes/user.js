const express = require('express')
const { get, createUser } = require('../controllers/user')

const {schemaValidator} = require("../middlewares/validateHelper")
const {register} = require("../schemas/UserRegister")

const router = express.Router()

// example of a route with index controller get function
router.get('/', get)
router.post('/',schemaValidator(register), createUser)

module.exports = router