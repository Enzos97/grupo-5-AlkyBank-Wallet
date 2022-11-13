const express = require('express')
const { login } = require('../controllers/user')
const { schemaValidator } = require("../middlewares/validateHelper")
const { loginSchema } = require("../schemas/users")

const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     auth:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The auto-generated id of the auth
 *         password:
 *           type: string
 *           description: auth's name
 *       required:
 *         - name
 *         - email
 *       example:
 *        email: "x@xavierinstitutes.edu"
 *        password: "CIg9m5ye89Ovq:BV"
 *       
 *     authNotFound:
 *       type: object
 *       properties:
 *         msg:
 *          type: string
 *          description: A message for the not found auth
 *       example:
 *          msg: auth was not found
 *     authResponse:
 *       type: object
 *       properties:
 *         status:
 *          token: string
 *   
 */



 /**
  * @swagger
  * tags:
  *   name: Auth
  *   description: Auth endpoints
  */


 /**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: logs an user account
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/auth'
 *    responses:
 *      200:
 *        description: autentication token
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/authResponse'
 *      500:
 *        description: Some server error
 *
 */
router.post('/login', schemaValidator(loginSchema), login)

module.exports = router