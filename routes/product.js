// GET    /api/products                       → list / search / paginate products  
// GET    /api/products/:productId            → single product details  
// POST   /api/products                       → create a product  
// PUT    /api/products/:productId            → update a product  
// DELETE /api/products/:productId            → delete a product  
// GET    /api/categories                     → list all categories  
// POST   /api/categories                     → create a category  
// PUT    /api/categories/:categoryId         → update a category  
// DELETE /api/categories/:categoryId         → delete a category  

const express = require("express");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/auth");
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
router.get("/", authMiddleware, (req, res) => {
    console.log("Fetching all products");

    Product.findAll()
        .then(products => {
            console.log("Products fetched successfully:", products);
            if (!products || products.length === 0) {
                return res.status(404).json({ message: "No products found" });
            }
            console.log("Products found:", products.length);
            // Optionally, you can format the product data before sending it
            products = products.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
                description: product.description,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt
            }));
            console.log("Formatted products:", products);
            // Send the list of products as a JSON response
            console.log("Sending products response");
            console.log("Response status code:", res.statusCode);
            console.log("Response headers:", res.getHeaders());
            console.log("Response body:", products);
            console.log("Response sent successfully");

            res.json(products);
        })
        .catch(err => {
            console.error("Error fetching products:", err);
            res.status(500).json({ message: "Internal server error" });
        });
}
);

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
router.get("/:productId", authMiddleware, (req, res) => {
    const productId = req.params.productId;
    console.log(`Fetching product with ID: ${productId}`);

    Product.findByPk(productId)
        .then(product => {
            if (!product) {
                console.log(`Product with ID ${productId} not found`);
                return res.status(404).json({ message: "Product not found" });
            }
            console.log("Product fetched successfully:", product);
            res.json({
                id: product.id,
                name: product.name,
                price: product.price,
                description: product.description,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt
            });
        })
        .catch(err => {
            console.error("Error fetching product:", err);
            res.status(500).json({ message: "Internal server error" });
        });
}
);
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
router.post("/", authMiddleware, (req, res) => {
    const { name, price, description } = req.body;
    console.log("Creating new product:", { name, price, description });

    Product.create({ name, price, description })
        .then(product => {
            console.log("Product created successfully:", product);
            res.status(201).json({
                id: product.id,
                name: product.name,
                price: product.price,
                description: product.description,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt
            });
        })
        .catch(err => {
            console.error("Error creating product:", err);
            res.status(500).json({ message: "Internal server error" });
        });
}
); 

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
router.put("/:productId", authMiddleware, (req, res) => {
    const productId = req.params.productId;
    const { name, price, description, stock } = req.body;
    console.log(`Updating product with ID: ${productId}`, { name, price, description, stock });

    Product.findByPk(productId)
        .then(product => {
            if (!product) {
                console.log(`Product with ID ${productId} not found`);
                return res.status(404).json({ message: "Product not found" });
            }
            return product.update({ name, price, description });
        })
        .then(updatedProduct => {
            console.log("Product updated successfully:", updatedProduct);
            res.json({
                id: updatedProduct.id,
                name: updatedProduct.name,
                price: updatedProduct.price,
                description: updatedProduct.description,
                stock: updatedProduct.stock,
                createdAt: updatedProduct.createdAt,
                updatedAt: updatedProduct.updatedAt
            });
        })
        .catch(err => {
            console.error("Error updating product:", err);
            res.status(500).json({ message: "Internal server error" });
        });
}
);

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
router.delete("/:productId", authMiddleware, (req, res) => {
    const productId = req.params.productId;
    console.log(`Deleting product with ID: ${productId}`);

    Product.destroy({ where: { id: productId } })
        .then(deletedCount => {
            if (deletedCount === 0) {
                console.log(`Product with ID ${productId} not found`);
                return res.status(404).json({ message: "Product not found" });
            }
            console.log("Product deleted successfully");
            res.status(204).send();
        })
        .catch(err => {
            console.error("Error deleting product:", err);
            res.status(500).json({ message: "Internal server error" });
        });
}
);

module.exports = router;
// This code defines the routes for managing products in an e-commerce application.
// It includes endpoints for listing, retrieving, creating, updating, and deleting products.
// The routes are protected by an authentication middleware to ensure that only authorized users can access them.
// The Swagger documentation is included to provide a clear API specification for these routes.
