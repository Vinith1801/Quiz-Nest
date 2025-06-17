const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  question: { type: String, required: true },
  options: [String],
  answer: { type: String, required: true },
});

module.exports = mongoose.model("Question", questionSchema);
