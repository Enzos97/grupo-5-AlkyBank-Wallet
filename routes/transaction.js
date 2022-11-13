const express = require('express')

const { createTransaction, getTransactions, updateTransaction, deleteTransaction, getTransactionsQuery, transactionData } = require('../controllers/transaction')
const { auth } = require('../middlewares/authUser')
const { isOwnership } = require('../middlewares/ownership')
const { schemaValidator } = require("../middlewares/validateHelper")
const { updateTransactionSchema, newTransaction } = require("../schemas/transactions")
// const {} = require("../middlewares")
// const {} = require("../schemas")

const router = express.Router()

// example of a route with index controller get function


/**
 * @swagger
 * components:
 *   schemas:
 *     Trasaction:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Trasaction
 *         userId:
 *           type: number
 *           description: User's id
 *         categoryId:
 *           type: number
 *           description: Category's id
 *         amount:
 *           type: number
 *           description: Amount of the transaction
 *         description:
 *           type: string
 *           description: Trasaction's description
 *         date:
 *           type: string
 *           description: Transaction's date 
 * 
 *       required:
 *         - userId
 *         - categoryId
 *         - amount
 *         - description
 *       example:
 *         userId: 6
 *         categoryId: 5 
 *         amount: 243.34
 *         description: Compra Comida
 *       
 *     TrasactionNotFound:
 *       type: object
 *       properties:
 *         msg:
 *          type: string
 *          description: A message for the not found Trasaction
 *       example:
 *          msg: Trasaction was not found
 *     TrasactionResponse:
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
 *    TrasactionId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *       type: number
 *      description: Trasaction id         
 *
 */



  /**
 * @swagger
 * /transaction/:
 *  get:
 *    security:
 *     - bearerAuth: []
 *    summary: get the list of transactions
 *    tags: [Transaction]
 *    responses:
 *      200:
 *        description: The found User
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Transaction'
 *      404:
 *        description: the transaction was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TransactionNotFound'
 */
router.get('/', auth, getTransactions)

  /**
 * @swagger
 * /transaction/{id}:
 *  get:
 *    security:
 *     - bearerAuth: []
 *    summary: get a Transaction by id
 *    tags: [Transaction]
 *    parameters:
 *      - $ref: '#/components/parameters/TrasactionId'
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
router.get('/:id', auth, transactionData)

//falta documentar este endpoint
router.get('/', auth, isOwnership, getTransactionsQuery)

/**
 * @swagger
 * /transaction/:
 *  post:
 *    security:
 *     - bearerAuth: []
 *    summary: create a new Trasaction
 *    tags: [Transaction]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Trasaction'
 *    responses:
 *      200:
 *        description: the Trasaction created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TrasactionResponse'
 *      500:
 *        description: Some server error
 *
 */
router.post('/', auth, schemaValidator(newTransaction), createTransaction)


/**
 * @swagger
 * /trasaction/{id}:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     summary: Edit an Trasaction's info
 *     tags: [Transaction]
 *     responses:
 *       200:
 *         description: Edit an Trasaction's info
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Trasaction'
 */

router.put('/:id', auth,schemaValidator(updateTransactionSchema),updateTransaction)


/**
 * @swagger
 * /transaction/{id}:
 *  delete:
 *    security:
 *     - bearerAuth: []
 *    summary: deletes a Trasaction by Id
 *    tags: [Transaction]
 *    parameters:
 *      - $ref: '#/components/parameters/TrasactionId'
 *    responses:
 *      200:
 *        description: The deleted Trasaction
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Trasaction'
 *      404:
 *        description: the Trasaction was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TrasactionNotFound'
 */
router.delete('/:id', auth, deleteTransaction)

module.exports = router

