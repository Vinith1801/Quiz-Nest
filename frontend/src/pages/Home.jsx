// src/pages/Home.jsx
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

const Home = () => {
  return (
    <PageWrapper>
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-200 overflow-hidden">
      
      {/* Decorative Shapes */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-300 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-60px] right-[-60px] w-96 h-96 bg-purple-300 opacity-20 rounded-full blur-2xl animate-pulse"></div>

      {/* Main Content */}
      <div className="z-10 bg-white/70 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-2xl w-full text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-indigo-700 mb-4">
          Welcome to <span className="text-purple-600">QuizNest</span> 🧠
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-8 font-medium">
          Sharpen your mind with fast, fun & competitive quizzes.
        </p>

        <Link
          to="/categories"
          className="inline-block px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-md transition duration-300 ease-in-out"
        >
          🚀 Start Quiz
        </Link>
      </div>
    </div>
    </PageWrapper>
  );
};

export default Home;
