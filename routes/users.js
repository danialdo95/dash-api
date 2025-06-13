const authMiddleware = require("../middleware/auth");

const express = require("express");
const userController = require("../controllers/user");
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
router.get("/", userController.getAllUsers);

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
router.get("/:userId", userController.getuserDetail);
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
router.put("/:userId", userController.updateUserDetail);
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
router.delete("/:userId", userController.deleteUser);

// POST   /api/auth/register      → create a new admin/user  
// POST   /api/auth/login         → obtain JWT  
// POST   /api/auth/logout        → (optional) invalidate token  
// GET    /api/users/me           → current user’s profile  
// GET    /api/users              → list all users (admins/staff)  
// PUT    /api/users/:id          → update a user  
// DELETE /api/users/:id          → remove a user  

module.exports = router;
