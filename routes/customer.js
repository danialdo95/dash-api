const express = require("express");
const authMiddleware = require("../middleware/auth");
const customerController = require("../controllers/customer");
const router = express.Router();

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Get all customers
 *     description: Retrieve a list of all customers in the system.
 *     tags:
 *       - Customers
 *     responses:
 *       200:
 *         description: List of customers
 */
router.get("/", authMiddleware, customerController.getAllCustomers);

/**
 * @swagger
 * /api/customers/{customerId}:
 *   get:
 *     summary: Get customer details
 *     description: Retrieve detailed information about a specific customer, including their orders and profile.
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the customer to retrieve.
 *     responses:
 *       200:
 *         description: Customer details retrieved successfully
 *       404:
 *         description: Customer not found
 */
router.get("/:customerId", authMiddleware,customerController.getCustomerDetails);

/**
 * @swagger
 * /api/customers/{customerId}:
 *   put:
 *     summary: Update customer information
 *     description: Update the details of a specific customer.
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the customer to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *       404:
 *         description: Customer not found
 */
router.put("/:customerId", authMiddleware, customerController.updateCustomerDetails);

/**
 * @swagger
 * /api/customers/{customerId}:
 *   delete:
 *     summary: Delete a customer
 *     description: Remove a specific customer from the system.
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the customer to delete.
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 *       404:
 *         description: Customer not found
 */
router.delete("/:customerId", authMiddleware, customerController.deleteCustomer);

// GET    /api/customers                      → list / search customers  
// GET    /api/customers/:customerId          → customer details (orders, profile)  
// PUT    /api/customers/:customerId          → update customer info  
// DELETE /api/customers/:customerId          → (optional) deactivate account  

module.exports = router;
// Export the router to be used in the main app
