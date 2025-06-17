import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total, timeTaken, category_id } = location.state || {};

  if (score === undefined) {
    return (
      <div className="text-center mt-20">
        <p className="text-xl text-gray-700">No result data found. Please take a quiz first.</p>
        <button
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow"
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
      </div>
    );
  }

  const percentage = Math.round((score / total) * 100);

  // 🎯 Dynamic Emoji Feedback
  const getMessage = () => {
    if (percentage >= 80) return "🏆 Excellent!";
    if (percentage >= 50) return "👍 Good effort!";
    return "💪 Keep practicing!";
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-gradient-to-br from-green-50 to-blue-100">
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-6">
          🎉 Quiz Completed!
        </h1>

        {/* 🧭 Score Circle */}
        <div className="relative w-40 h-40 mx-auto mb-6">
          <svg className="transform -rotate-90" width="160" height="160">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#e5e7eb"
              strokeWidth="15"
              fill="transparent"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#3b82f6"
              strokeWidth="15"
              fill="transparent"
              strokeDasharray="440"
              strokeDashoffset={440 - (440 * percentage) / 100}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 1s ease-out" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-700">{percentage}%</span>
          </div>
        </div>

        {/* 📝 Stats */}
        <div className="text-lg text-gray-800 space-y-2 mb-4">
          <p>✅ <strong>{score}</strong> out of <strong>{total}</strong> questions</p>
          <p>⏱️ Time Taken: <strong>{timeTaken}s</strong></p>
        </div>

        {/* 🧠 Feedback */}
        <p className="text-xl font-semibold text-green-600 mb-8">{getMessage()}</p>

        {/* 🎮 Action Buttons */}
        <div className="grid sm:grid-cols-2 gap-4">
          <button
            onClick={() => navigate(`/quiz/${category_id}`)}
            className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-medium shadow"
          >
            🔁 Retake Quiz
          </button>
          <button
            onClick={() => navigate("/categories")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium shadow"
          >
            📚 New Category
          </button>
          <button
            onClick={() => navigate(`/leaderboard/${category_id}`)}
            className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium shadow"
          >
            🏅 Leaderboard
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-xl font-medium shadow"
          >
            🏠 Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
