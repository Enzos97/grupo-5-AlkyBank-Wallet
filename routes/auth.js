const express = require('express')
const { login } = require('../controllers/user')
const { schemaValidator } = require("../middlewares/validateHelper")
const { loginSchema } = require("../schemas/users")

const router = express.Router()

router.post('/login', schemaValidator(loginSchema), login)

module.exports = router