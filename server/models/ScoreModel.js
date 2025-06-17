const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  score: Number,
  time_taken: Number,
  total_questions: Number,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Score", ScoreSchema);
