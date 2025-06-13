const Customer = require("../models/Customer");


exports.getAllCustomers = (req, res) => {
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

exports.getCustomerDetails = (req, res) => {
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


exports.updateCustomerDetails = (req, res) => {
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

exports.deleteCustomer = (req, res) => {
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