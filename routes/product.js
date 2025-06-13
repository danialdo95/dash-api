const express = require("express");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/auth");
const productController = require("../controllers/product");
const router = express.Router();


/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products in the system.
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: List of products
 */
router.get("/", authMiddleware, productController.getAllProducts);

/**
 * @swagger
 * /api/products/{productId}:
 *   get:
 *     summary: Get a single product by ID
 *     description: Retrieve details of a specific product by its ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product to retrieve.
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 */
router.get("/:productId", authMiddleware, productController.getProductById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     description: Add a new product to the system.
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.post("/", authMiddleware, productController.createProduct); 

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     description: Add a new product to the system.
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.put("/:productId", authMiddleware, productController.updateProduct);

/**
 * @swagger
 * /api/products/{productId}:
 *   delete:
 *     summary: Delete a product by ID
 *     description: Remove a specific product from the system by its ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product to delete.
 *     responses:
 *       204:
 *         description: Product deleted successfully
 */
router.delete("/:productId", authMiddleware, productController.deleteProduct);



module.exports = router;


// GET    /api/products                       → list / search / paginate products 
 
// GET    /api/products/:productId            → single product details  
// POST   /api/products                       → create a product  
// PUT    /api/products/:productId            → update a product  
// DELETE /api/products/:productId            → delete a product  

// GET    /api/categories                     → list all categories  
// POST   /api/categories                     → create a category  
// PUT    /api/categories/:categoryId         → update a category  
// DELETE /api/categories/:categoryId         → delete a category  


// This code defines the routes for managing products in an e-commerce application.
// It includes endpoints for listing, retrieving, creating, updating, and deleting products.
// The routes are protected by an authentication middleware to ensure that only authorized users can access them.
// The Swagger documentation is included to provide a clear API specification for these routes.
