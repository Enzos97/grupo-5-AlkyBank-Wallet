const express = require('express')
const { get, createUser, userData, deletedUser,editUser } = require('../controllers/user')

const { schemaValidator } = require("../middlewares/validateHelper")
const { register,edit } = require("../schemas/users")
const {uploadImage} = require("../middlewares/multer")

const router = express.Router()

// example of a route with index controller get function
router.get('/', get)

router.get('/:id', userData)
router.post('/',uploadImage,schemaValidator(register), createUser)
router.delete('/:id', deletedUser)
router.put('/:id',schemaValidator(edit),editUser)

module.exports = router