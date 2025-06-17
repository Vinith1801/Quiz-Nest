const Category = require("../models/CategoryModel");
const Question = require("../models/QuizModel");
const Score = require("../models/ScoreModel");
const User = require("../models/UserModel");
const mongoose = require("mongoose");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching categories" });
  }
};

const getQuestions = async (req, res) => {
  const categoryId = req.query.category;
  if (!categoryId) {
    return res.status(400).json({ msg: "Category ID is required" });
  }

  try {
    const questions = await Question.aggregate([
      {
        $match: {
          category_id: new mongoose.Types.ObjectId(categoryId)
        }
      },
      {
        $sample: { size: 10 } // randomly selects 10 questions
      }
    ]);

    // Utility to shuffle options
    const shuffleArray = (array) => {
      return array
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    };

    const shuffledQuestions = questions.map((q) => ({
      ...q,
      options: shuffleArray(q.options), // shuffled options
    }));

    res.json(shuffledQuestions);
  } catch (err) {
    console.error("Error fetching random questions:", err);
    res.status(500).json({ msg: "Error fetching questions" });
  }
};

const submitScore = async (req, res) => {
  try {
    const userId = req.user.id;
    const { category_id, score, time_taken, total_questions } = req.body;

    const newScore = new Score({
      user_id: new mongoose.Types.ObjectId(userId),
      category_id: new mongoose.Types.ObjectId(category_id),
      score,
      time_taken,
      total_questions,
    });

    await newScore.save();

    res.status(201).json({ message: "Score submitted successfully" });
  } catch (err) {
    console.error("Error in submitScore:", err);
    res.status(500).json({ message: "Error submitting score", error: err.message });
  }
};

const getLeaderboard = async (req, res) => {

  const categoryId = req.params.id;

  try {
    const topScores = await Score.aggregate([
      {
        $match: {
          category_id: new mongoose.Types.ObjectId(categoryId)
        }
      },
      {
        $group: {
          _id: "$user_id",
          top_score: { $max: "$score" }
        }
      },
      { $sort: { top_score: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          username: "$user.username",
          top_score: 1
        }
      }
    ]);

    res.json(topScores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching leaderboard" });
  }
};

const getUserScoreHistory = async (req, res) => {
  const userId = req.user.id;

  try {
    const scores = await Score.find({ user_id: userId })
    .sort({ created_at: -1 })
    .populate("category_id", "name");

    const formatted = scores.map(s => ({
      category: s.category_id?.name,
      score: s.score,
      time_taken: s.time_taken,
      total_questions: s.total_questions,
      created_at: s.created_at
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching user scores" });
  }
};

module.exports = {
  getCategories,
  getQuestions,
  submitScore,
  getLeaderboard,
  getUserScoreHistory
};
