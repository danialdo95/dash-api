const authController = require("../controllers/auth");
const authMiddleware = require("../middleware/auth");

const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /api/auth/protected:
 *    get:
 *     summary: Get protected user data
 *     description: This route is protected and requires a valid JWT token to access.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer <your_jwt_token>
 *     responses:
 *       200:
 *         description: Protected user data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Protected user data", user: req.user });
});

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *   summary: User registration
 *   description: Register a new user and return a success message.
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *             email:   
 *              type: string
 *   responses:
 *     201:
 *       description: User registered successfully
 *     400:
 *       description: Bad request, e.g., missing fields or invalid data
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *   summary: User login
 *   description: Authenticate user and return a JWT token.
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *   responses:
 *     200:
 *       description: Successful login with JWT token
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     400:
 *       description: Invalid username or password
 *     401:
 *       description: Unauthorized
 *     403:
 *       description: Forbidden
 */
router.post("/login", authController.login);

module.exports = router;
