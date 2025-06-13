// GET    /api/orders                         → list orders (filter by status/date)  
// GET    /api/orders/:orderId                → order detail (items, shipping, payment)  
// POST   /api/orders                         → manually create/order (if needed)  
// PUT    /api/orders/:orderId                → update status (e.g. “shipped”, “delivered”)  
// DELETE /api/orders/:orderId                → cancel order  
const Order = require("../models/Order");

exports.getAllOrders = (req, res) => {
    console.log("Fetching all orders");

    Order.findAll()
        .then(orders => {
            console.log("Orders fetched successfully:", orders);
            if (!orders || orders.length === 0) {
                return res.status(404).json({ message: "No orders found" });
            }
            console.log("Orders found:", orders.length);
            // Optionally, you can format the order data before sending it
            orders = orders.map(order => ({
                id: order.id,
                customerId: order.customerId,
                status: order.status,
                totalAmount: order.totalAmount,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt
            }));
            console.log("Formatted orders:", orders);
            // Send the list of orders as a JSON response
            console.log("Sending orders response");
            console.log("Response status code:", res.statusCode);
            console.log("Response headers:", res.getHeaders());
            console.log("Response body:", orders);
            console.log("Response sent successfully");

            res.json(orders);
        })
        .catch(err => {
            console.error("Error fetching orders:", err);
            res.status(500).json({ message: "Internal server error" });
        });
}

exports.getOrderDetails = (req, res) => {
    const orderId = req.params.orderId;
    console.log(`Fetching order with ID: ${orderId}`);

    Order.findByPk(orderId)
        .then(order => {
            if (!order) {
                console.log("Order not found");
                return res.status(404).json({ message: "Order not found" });
            }
            console.log("Order found:", order);
            // Format the order data before sending it
            const formattedOrder = {
                id: order.id,
                customerId: order.customerId,
                status: order.status,
                totalAmount: order.totalAmount,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt
            };
            console.log("Formatted order:", formattedOrder);
            // Send the order details as a JSON response
            res.json(formattedOrder);
        })
        .catch(err => {
            console.error("Error fetching order:", err);
            res.status(500).json({ message: "Internal server error" });
        });
}

exports.createNewOrder =  (req, res) => {
    const { customerId, totalAmount, status = "pending" } = req.body;
    console.log("Creating new order with data:", req.body);

    Order.create({ customerId, totalAmount, status })
        .then(order => {
            console.log("Order created successfully:", order);
            res.status(201).json({
                id: order.id,
                customerId: order.customerId,
                totalAmount: order.totalAmount,
                status: order.status,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt
            });
        })
        .catch(err => {
            console.error("Error creating order:", err);
            res.status(500).json({ message: "Internal server error" });
        });
}
 
exports.updateOrderStatus = (req, res) => {
    const orderId = req.params.orderId;
    const { status } = req.body;
    console.log(`Updating order with ID: ${orderId}, new status: ${status}`);

    Order.findByPk(orderId)
        .then(order => {
            if (!order) {
                console.log("Order not found");
                return res.status(404).json({ message: "Order not found" });
            }
            order.status = status;
            return order.save();
        })
        .then(updatedOrder => {
            console.log("Order status updated successfully:", updatedOrder);
            res.json({
                id: updatedOrder.id,
                customerId: updatedOrder.customerId,
                totalAmount: updatedOrder.totalAmount,
                status: updatedOrder.status,
                createdAt: updatedOrder.createdAt,
                updatedAt: updatedOrder.updatedAt
            });
        })
        .catch(err => {
            console.error("Error updating order:", err);
            res.status(500).json({ message: "Internal server error" });
        });
}

exports.cancelOrder = (req, res) => {
    const orderId = req.params.orderId;
    console.log(`Cancelling order with ID: ${orderId}`);

    Order.destroy({ where: { id: orderId } })
        .then(deletedCount => {
            if (deletedCount === 0) {
                console.log("Order not found or already cancelled");
                return res.status(404).json({ message: "Order not found" });
            }
            console.log("Order cancelled successfully");
            res.status(204).send();
        })
        .catch(err => {
            console.error("Error cancelling order:", err);
            res.status(500).json({ message: "Internal server error" });
        });
}