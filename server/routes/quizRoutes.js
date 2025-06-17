const express = require("express");
const {
  getCategories,
  getQuestions,
  submitScore,
  getLeaderboard,
  getUserScoreHistory
} = require("../controllers/quizController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/categories", getCategories);
router.get("/questions", verifyToken, getQuestions);
router.post("/submit-score", verifyToken, submitScore); // POST with new fields supported
router.get("/leaderboard/:id", getLeaderboard); // Added ":id" to fetch leaderboard for a specific category
router.get("/history", verifyToken, getUserScoreHistory); // Added route to get user score history

module.exports = router;