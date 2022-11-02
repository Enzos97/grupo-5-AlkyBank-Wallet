const express = require('express')
const { get, createUser, userData } = require('../controllers/user')

const {schemaValidator} = require("../middlewares/validateHelper")
const {register} = require("../schemas/UserRegister")

const router = express.Router()

// example of a route with index controller get function
router.get('/', get)

router.get('/:id', userData)
router.post('/', createUser)


module.exports = router