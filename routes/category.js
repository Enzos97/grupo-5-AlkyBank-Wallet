const express = require('express')
const { get, getById, createCategory, editCategory,deleteCategory } = require('../controllers/category')


const router = express.Router()

// example of a route with index controller get function

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the category
 *         name:
 *           type: string
 *           description: Category's name
 *         description:
 *           type: string
 *           description: Category's description
 *       example:
 *        name: Outcomes
 *        description: categoria de egresos
 */

 /**
  * @swagger
  * tags:
  *   name: Category
  *   description: Category endpoints
  */



 /**
 * @swagger
 * /categories:
 *   get:
 *     summary: Returns the list of all the categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: The list of the Categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get('/', get)


 /**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Get a category by id
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.put('/:id', editCategory)

 /**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get a category by id
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Create a new category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get('/:id', getById)

 /**
 * @swagger
 * /category:
 *  post:
 *     summary: Create a new category
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Create a new category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.post('/', createCategory)
router.delete('/:id',deleteCategory)

module.exports = router