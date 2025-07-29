const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");
const authRateLimiter = require("../middleware/rateLimiter");

router.post("/signup", authRateLimiter, signup);
router.post("/login", authRateLimiter, login);

module.exports = router;
