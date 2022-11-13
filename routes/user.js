const express = require('express')
const { get, createUser, userData, deletedUser,editUser } = require('../controllers/user')

const { schemaValidator } = require("../middlewares/validateHelper")
const { register,edit } = require("../schemas/users")
const {uploadImage} = require("../middlewares/multer")
const { auth } = require('../middlewares/authUser')

const router = express.Router()

// example of a route with index controller get function


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the User
 *         firstName:
 *           type: string
 *           description: User's name
 *         lastName:
 *           type: string
 *           description: User's lastname
 *         email:
 *           type: string
 *           description: User's email
 *         password:
 *           type: string
 *           description: User's password
 * 
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       example:
 *         firstName: Bruce
 *         lastName: Wayne 
 *         email: bruce@wayne.inc
 *         password: sdfasd0'SSFDSAXFSDAF
 *       
 *     UserNotFound:
 *       type: object
 *       properties:
 *         msg:
 *          type: string
 *          description: A message for the not found User
 *       example:
 *          msg: User was not found
 *     UserResponse:
 *       type: object
 *       properties:
 *         status:
 *          type: boolean
 *         code:
 *          type: number
 *   
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT          
 * 
 *   parameters:
 *    UserId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *       type: string
 *      description: User id
 *    PageId:
 *      in: query
 *      name: page
 *      schema: 
 *        type: number
 *      description: Page number         
 *
 */


 /**
 * @swagger
 * /users/:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     parameters:
 *      - $ref: '#/components/parameters/PageId'
 *     responses:
 *       200:
 *         description: The list of the Users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', get)


  /**
 * @swagger
 * /users/{id}:
 *  get:
 *    security:
 *     - bearerAuth: []
 *    summary: get a User by Id
 *    tags: [Users]
 *    parameters:
 *      - $ref: '#/components/parameters/UserId'
 *    responses:
 *      200:
 *        description: The found User
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/User'
 *      404:
 *        description: the User was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserNotFound'
 */
router.get('/:id', auth, userData)

/**
 * @swagger
 * /users:
 *  post:
 *    summary: create a new User
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: the User created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserResponse'
 *      500:
 *        description: Some server error
 *
 */
router.post('/', uploadImage,schemaValidator(register),createUser)



/**
 * @swagger
 * /users/{id}:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     summary: Edit an user's info
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Edit an user's info
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.put('/:id', auth,schemaValidator(edit),editUser)


/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    security:
 *     - bearerAuth: []
 *    summary: deletes a User by Id
 *    tags: [Users]
 *    parameters:
 *      - $ref: '#/components/parameters/UserId'
 *    responses:
 *      200:
 *        description: The deleted user
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/User'
 *      404:
 *        description: the User was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserNotFound'
 */
 router.delete('/:id', auth, deletedUser)

module.exports = router




