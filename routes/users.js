const authMiddleware = require("../middleware/auth");

const express = require("express");
const User = require("../models/User");
const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *    summary: Get all users
 *    description: Retrieve a list of all users in the system.
 *    tags:
 *       - Users
 *    responses:
 *       200:
 *         description: List of users
 */
router.get("/", authMiddleware, (req, res) => {
    console.log("Fetching all users");

    User.findAll()
        .then(users => {

            console.log("Users fetched successfully:", users);
            if (!users || users.length === 0) {
                return res.status(404).json({ message: "No users found" });
            }
            console.log("Users found:", users.length);
            // Optionally, you can format the user data before sending it
            users = users.map(user => ({
                id: user.id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }));
            console.log("Formatted users:", users);
            // Send the list of users as a JSON response
            console.log("Sending users response");
            console.log("Response status code:", res.statusCode);
            console.log("Response headers:", res.getHeaders());
            console.log("Response body:", users);
            console.log("Response sent successfully");

            
            res.json(users);
        })
        .catch(err => {
            console.error("Error fetching users:", err);
            res.status(500).json({ message: "Internal server error" });
        });
});

module.exports = router;
