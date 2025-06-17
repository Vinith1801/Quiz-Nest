// src/pages/Quiz.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import Loader from "../components/Loader";

const Quiz = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`/quiz/questions?category=${id}`, {
          headers: { Authorization: token },
        });
        setQuestions(res.data);
        setStartTime(Date.now());
      } catch (err) {
        console.error("Failed to fetch questions", err);
      }
    };

    fetchQuestions();
  }, [id, token]);

  useEffect(() => {
    setTimeLeft(30);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleNext();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleOptionClick = (option) => setSelectedOption(option);

  const handleNext = () => {
    const currentQuestion = questions[currentIndex];
    if (selectedOption === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }

    setSelectedOption(null);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    try {
      await axios.post(
      "/quiz/submit-score",
      {
        category_id: id,
        score,
        time_taken: timeTaken,
        total_questions: questions.length,
      },
      { headers: { Authorization: token } }
    );

      navigate("/result", {
        state: { score, total: questions.length, timeTaken, category_id: id },
      });
    } catch (err) {
      console.error("Failed to submit score", err);
    }
  };

  if (!questions.length) return <Loader />;

  const currentQuestion = questions[currentIndex];

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 py-10 px-4">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-indigo-700">
            ❓ Question {currentIndex + 1} of {questions.length}
          </h2>
          <div className="text-red-600 font-bold text-sm sm:text-base">
            ⏱ {timeLeft}s
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-8">
          <div
            className="h-2 bg-blue-500 transition-all duration-500"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>

        {/* Question */}
        <p className="text-lg sm:text-xl font-medium text-gray-800 mb-6">
          {currentQuestion.question}
        </p>

        {/* Options */}
        <div className="grid gap-4">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionClick(option)}
              className={`w-full py-3 px-5 rounded-xl border text-left font-medium transition transform duration-200 ${
                selectedOption === option
                  ? "bg-blue-600 text-white border-blue-700 shadow-md scale-105"
                  : "bg-white hover:bg-blue-50 text-gray-800 border-gray-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Next / Submit Button */}
        <button
          onClick={handleNext}
          disabled={selectedOption === null}
          className={`mt-8 w-full py-3 rounded-xl text-white font-semibold shadow-md transition duration-300 ${
            selectedOption === null
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {currentIndex + 1 === questions.length ? "🎯 Submit Quiz" : "➡️ Next Question"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
