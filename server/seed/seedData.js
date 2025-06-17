const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Category = require("../models/CategoryModel");
const Question = require("../models/QuizModel");
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/quiznest", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Category.deleteMany({});
    await Question.deleteMany({});

    const dataPath = path.join(__dirname, "data.json");
    const jsonData = fs.readFileSync(dataPath, "utf-8");
    const categories = JSON.parse(jsonData);

    for (const cat of categories) {
      const { name, image_url, questions } = cat;

      // Insert category
      const newCategory = await Category.create({ name, image_url });

      // Insert questions linked to this category
      const formattedQuestions = questions.map((q) => ({
        category_id: newCategory._id,
        question: q.question,
        options: q.options,
        answer: q.answer,
      }));

      await Question.insertMany(formattedQuestions);
      console.log(`Inserted: ${name} (${questions.length} questions)`);
    }

    console.log("✅ Database seeding complete.");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seedDatabase();
