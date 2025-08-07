require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:5173", // replace with your frontend URL
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
