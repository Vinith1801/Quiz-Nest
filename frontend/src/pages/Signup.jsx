import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signup(formData);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-200 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-sm p-8 bg-white/30 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">✨ Create Account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            disabled={loading}
            className={`w-full px-4 py-3 rounded-xl bg-white/40 placeholder-gray-600 text-gray-800 border border-white/30 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400
              ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            disabled={loading}
            className={`w-full px-4 py-3 rounded-xl bg-white/40 placeholder-gray-600 text-gray-800 border border-white/30 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400
              ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          />

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
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90"}`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Creating Account...
              </div>
            ) : (
              "Sign Up"
            )}

          </motion.button>

        </form>

        <p className="mt-4 text-sm text-center text-gray-700">
          Already have an account?{" "}
          <Link to="/signin" className="text-purple-600 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
