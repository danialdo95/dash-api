// GET    /api/customers                      → list / search customers  
// GET    /api/customers/:customerId          → customer details (orders, profile)  
// PUT    /api/customers/:customerId          → update customer info  
// DELETE /api/customers/:customerId          → (optional) deactivate account  

const express = require("express");
const Customer = require("../models/Customer");
const authMiddleware = require("../middleware/auth");
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
router.get("/", authMiddleware, (req, res) => {
    console.log("Fetching all customers");

    Customer.findAll()
        .then(customers => {
            console.log("Customers fetched successfully:", customers);
            if (!customers || customers.length === 0) {
                return res.status(404).json({ message: "No customers found" });
            }
            console.log("Customers found:", customers.length);
            // Optionally, you can format the customer data before sending it
            customers = customers.map(customer => ({
                id: customer.id,
                name: customer.name,
                email: customer.email,
                createdAt: customer.createdAt,
                updatedAt: customer.updatedAt
            }));
            console.log("Formatted customers:", customers);
            // Send the list of customers as a JSON response
            console.log("Sending customers response");
            console.log("Response status code:", res.statusCode);
            console.log("Response headers:", res.getHeaders());
            console.log("Response body:", customers);
            console.log("Response sent successfully");

            res.json(customers);
        })
        .catch(err => {
            console.error("Error fetching customers:", err);
            res.status(500).json({ message: "Internal server error" });
        });
}
);

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
router.get("/:customerId", authMiddleware, (req, res) => {
    const customerId = req.params.customerId;
    console.log(`Fetching details for customer ID: ${customerId}`);

    Customer.findByPk(customerId)
        .then(customer => {
            if (!customer) {
                console.log("Customer not found");
                return res.status(404).json({ message: "Customer not found" });
            }
            console.log("Customer found:", customer);
            // Optionally, you can format the customer data before sending it
            const formattedCustomer = {
                id: customer.id,
                name: customer.name,
                email: customer.email,
                createdAt: customer.createdAt,
                updatedAt: customer.updatedAt
            };
            console.log("Formatted customer:", formattedCustomer);
            // Send the customer details as a JSON response
            console.log("Sending customer details response");
            console.log("Response status code:", res.statusCode);
            console.log("Response headers:", res.getHeaders());
            console.log("Response body:", formattedCustomer);
            console.log("Response sent successfully");

            res.json(formattedCustomer);
        })
        .catch(err => {
            console.error("Error fetching customer details:", err);
            res.status(500).json({ message: "Internal server error" });
        });
}
);

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
router.put("/:customerId", authMiddleware, (req, res) => {
    const customerId = req.params.customerId;
    const { name, email } = req.body;
    console.log(`Updating customer ID: ${customerId}`);

    Customer.findByPk(customerId)
        .then(customer => {
            if (!customer) {
                console.log("Customer not found");
                return res.status(404).json({ message: "Customer not found" });
            }
            // Update customer details
            customer.name = name || customer.name;
            customer.email = email || customer.email;

            return customer.save();
        })
        .then(updatedCustomer => {
            console.log("Customer updated successfully:", updatedCustomer);
            res.json({
                id: updatedCustomer.id,
                name: updatedCustomer.name,
                email: updatedCustomer.email,
                createdAt: updatedCustomer.createdAt,
                updatedAt: updatedCustomer.updatedAt
            });
        })
        .catch(err => {
            console.error("Error updating customer:", err);
            res.status(500).json({ message: "Internal server error" });
        });
}
);

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
router.delete("/:customerId", authMiddleware, (req, res) => {
    const customerId = req.params.customerId;
    console.log(`Deleting customer ID: ${customerId}`);

    Customer.destroy({ where: { id: customerId } })
        .then(deletedCount => {
            if (deletedCount === 0) {
                console.log("Customer not found");
                return res.status(404).json({ message: "Customer not found" });
            }
            console.log("Customer deleted successfully");
            res.status(200).json({ message: "Customer deleted successfully" });
        })
        .catch(err => {
            console.error("Error deleting customer:", err);
            res.status(500).json({ message: "Internal server error" });
        });
}
);


module.exports = router;
// Export the router to be used in the main app
