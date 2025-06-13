// POST   /api/auth/register      → create a new admin/user  
// POST   /api/auth/login         → obtain JWT  
// POST   /api/auth/logout        → (optional) invalidate token  
// GET    /api/users/me           → current user’s profile  
// GET    /api/users              → list all users (admins/staff)  
// PUT    /api/users/:id          → update a user  
// DELETE /api/users/:id          → remove a user  

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

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *    summary: Get user details
 *    description: Retrieve details of a specific user by their ID.
 *    tags:
 *       - Users
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the user to retrieve.
 *    responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 */
router.get("/:userId", authMiddleware, (req, res) => {
    const userId = req.params.userId;
    console.log(`Fetching user with ID: ${userId}`);

    User.findByPk(userId)
        .then(user => {
            if (!user) {
                console.log("User not found");
                return res.status(404).json({ message: "User not found" });
            }
            console.log("User found:", user);
            // Format the user data before sending it
            const formattedUser = {
                id: user.id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            };
            console.log("Formatted user:", formattedUser);
            // Send the user details as a JSON response
            res.json(formattedUser);
        })
        .catch(err => {
            console.error("Error fetching user:", err);
            res.status(500).json({ message: "Internal server error" });
        });
}
);
/**
 * @swagger
 * /api/users/{userId}:
 *   put:
 *    summary: Update user details
 *    description: Update the details of a specific user by their ID.
 *    tags:
 *       - Users
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the user to update.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              email:
 *                type: string
 *    responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put("/:userId", authMiddleware, (req, res) => {
    const userId = req.params.userId;
    const { username, email } = req.body;
    console.log(`Updating user with ID: ${userId}`);

    User.findByPk(userId)
        .then(user => {
            if (!user) {
                console.log("User not found");
                return res.status(404).json({ message: "User not found" });
            }
            // Update user details
            user.username = username || user.username;
            user.email = email || user.email;

            return user.save();
        })
        .then(updatedUser => {
            console.log("User updated successfully:", updatedUser);
            res.json({
                id: updatedUser.id,
                username: updatedUser.username,
                email: updatedUser.email,
                createdAt: updatedUser.createdAt,
                updatedAt: updatedUser.updatedAt
            });
        })
        .catch(err => {
            console.error("Error updating user:", err);
            res.status(500).json({ message: "Internal server error" });
        });
}
);
/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *    summary: Delete a user
 *    description: Remove a specific user from the system by their ID.
 *    tags:
 *       - Users
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the user to delete.
 *    responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/:userId", authMiddleware, (req, res) => {
    const userId = req.params.userId;
    console.log(`Deleting user with ID: ${userId}`);

    User.destroy({ where: { id: userId } })
        .then(deletedCount => {
            if (deletedCount === 0) {
                console.log("User not found");
                return res.status(404).json({ message: "User not found" });
            }
            console.log("User deleted successfully");
            res.json({ message: "User deleted successfully" });
        })
        .catch(err => {
            console.error("Error deleting user:", err);
            res.status(500).json({ message: "Internal server error" });
        });
}
);

module.exports = router;
