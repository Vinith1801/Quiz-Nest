const express = require("express");
const router = express.Router();
const { signup, login, logout, me } = require("../controllers/authController");
const authRateLimiter = require("../middleware/rateLimiter");
const verifyToken = require("../middleware/authMiddleware");

router.post("/signup", authRateLimiter, signup);
router.post("/login", authRateLimiter, login);
router.post("/logout", logout);
router.get("/me", verifyToken, me);

module.exports = router;
