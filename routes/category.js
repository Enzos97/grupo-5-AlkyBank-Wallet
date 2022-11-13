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
 *       required:
 *         - name
 *         - description
 *       example:
 *        name: Outcomes
 *        description: categoria de egresos
 *       
 *     CategoryNotFound:
 *       type: object
 *       properties:
 *         msg:
 *          type: string
 *          description: A message for the not found category
 *       example:
 *          msg: Category was not found
 *     CategoryResponse:
 *       type: object
 *       properties:
 *         status:
 *          type: boolean
 *         code:
 *          type: number
 *   
 *          
 *   parameters:
 *    categoryId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *       type: string
 *      description: category id         
 *
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
 *  get:
 *    summary: get a category by Id
 *    tags: [Category]
 *    parameters:
 *      - $ref: '#/components/parameters/categoryId'
 *    responses:
 *      200:
 *        description: The found category
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Category'
 *      404:
 *        description: the category was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CategoryNotFound'
 */
router.get('/:id', getById)

/**
 * @swagger
 * /categories:
 *  post:
 *    summary: create a new category
 *    tags: [Category]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Category'
 *    responses:
 *      200:
 *        description: the category created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CategoryResponse'
 *      500:
 *        description: Some server error
 *
 */
 
router.post('/', createCategory)

/**
 * @swagger
 * /categories/{id}:
 *  put:
 *    summary: Edit a category info
 *    tags: [Category]
 *    parameters:
 *     - $ref: '#/components/parameters/categoryId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Category'
 *    responses:
 *      200:
 *        description: the category created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CategoryResponse'
 *      500:
 *        description: Some server error
 *
 */
 
router.put('/:id', editCategory)



/**
 * @swagger
 * /categories/{id}:
 *  delete:
 *    summary: deletes a category by Id
 *    tags: [Category]
 *    parameters:
 *      - $ref: '#/components/parameters/categoryId'
 *    responses:
 *      200:
 *        description: The deleted category
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Category'
 *      404:
 *        description: the category was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CategoryNotFound'
 */
router.delete('/:id',deleteCategory)

module.exports = router