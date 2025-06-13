const authMiddleware = require("../middleware/auth");

const express = require("express");
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
    console.log("User from middleware:", req.headers.authorization);
    // This is a placeholder for the actual user retrieval logic
    // In a real application, you would fetch users from the database
  res.json({ users: ["Alice", "Bob"] });
});

module.exports = router;
