import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingScreen from "../components/LoadingScreen";
import { FaUser, FaLock } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";
import {
  validateUsername,
  validatePassword,
} from "../utils/validators";


const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    if (loading) return; // Prevent input while loading
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const normalizedUsername = formData.username.trim().toLowerCase();
  const password = formData.password;

    // Capture validation error messages
  const usernameError = validateUsername(normalizedUsername);
  const passwordError = validatePassword(password);

  // If any error message exists, then validation fails.
  if (usernameError || passwordError) {
    setError("Invalid credentials format");
    return;
  }

  setLoading(true);
  try {
    await login({ username: normalizedUsername, password });
    navigate("/");
  } catch (err) {
    setError(err.response?.data?.msg || "Login failed");
  } finally {
    setLoading(false);
  }
};

  if (showSplash) return <LoadingScreen />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-blue-200 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-sm p-8 bg-white/30 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl"
      >
        <h1 className="text-2xl font-bold text-center text-blue-800 mb-6">🔐 Login to QuizNest</h1>

        <form
          onSubmit={(e) => {
            if (!loading) handleSubmit(e);
          }}
          className="space-y-4"
        >
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">
              <FaUser />
            </span>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={formData.username}
              required
              inputMode="latin"
              autoCapitalize="off"
              autoCorrect="off"
              disabled={loading}
              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/40 placeholder-gray-600 text-gray-800 border border-white/30 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400
                ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            />
          </div>

          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">
              <FaLock />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              required
              disabled={loading}
              className={`w-full pl-10 pr-10 py-3 rounded-xl bg-white/40 placeholder-gray-600 text-gray-800 border border-white/30 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400
                ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-purple-600 focus:outline-none"
            >
              {showPassword ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-700 bg-red-100 border border-red-300 px-4 py-2 rounded-xl text-center"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={!loading ? { scale: 1.02 } : {}}
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold shadow-lg transition-all
              ${loading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90"}`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </motion.button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-700">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-medium hover:underline">
            Sign up here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
