const express = require("express");
const authMiddleware = require("../middleware/auth");
const orderController = require("../controllers/order");
const router = express.Router();

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     description: Retrieve a list of all orders in the system.
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: List of orders
 */
router.get("/", authMiddleware, orderController.getAllOrders);  

/**
 * @swagger
 * /api/orders/{orderId}:
 *   get:
 *     summary: Get order details
 *     description: Retrieve detailed information about a specific order.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the order to retrieve.
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         description: Order not found
 */
router.get("/:orderId", authMiddleware, orderController.getOrderDetails);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     description: Manually create a new order in the system.
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: integer
 *               totalAmount:
 *                 type: number
 *                 format: float
 *               status:
 *                 type: string
 *                 default: "pending"
 *     responses:
 *       201:
 *         description: Order created successfully
 */
router.post("/", authMiddleware, orderController.createNewOrder); 

/**
 * @swagger
 * /api/orders/{orderId}:
 *   put:
 *     summary: Update order status
 *     description: Update the status of an existing order.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the order to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order status updated successfully
 */
router.put("/:orderId", authMiddleware, orderController.updateOrderStatus);

/**
 * @swagger
 * /api/orders/{orderId}:
 *   delete:
 *     summary: Cancel an order
 *     description: Remove an existing order from the system.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the order to cancel.
 *     responses:
 *       204:
 *         description: Order cancelled successfully
 */
router.delete("/:orderId", authMiddleware, orderController.cancelOrder);

// GET    /api/orders                         → list orders (filter by status/date)  
// GET    /api/orders/:orderId                → order detail (items, shipping, payment)  
// POST   /api/orders                         → manually create/order (if needed)  
// PUT    /api/orders/:orderId                → update status (e.g. “shipped”, “delivered”)  
// DELETE /api/orders/:orderId                → cancel order  

module.exports = router;
// This code defines the routes for managing orders in an e-commerce application.
// GET    /api/orders                         → list orders (filter by status/date)
// GET    /api/orders/:orderId                → order detail (items, shipping, payment)
// POST   /api/orders                         → manually create/order (if needed)
// PUT    /api/orders/:orderId                → update status (e.g. “shipped”, “delivered”)
// DELETE /api/orders/:orderId                → cancel order
// This code defines the routes for managing orders in an e-commerce application.