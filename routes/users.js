const express = require('express');
const router = express.Router();


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/', (req, res) => {
    res.json({ users: ['Alice', 'Bob'] });
});

module.exports = router;