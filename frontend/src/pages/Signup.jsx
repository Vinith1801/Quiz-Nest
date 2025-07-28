import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaLock, FaCheckCircle, FaTimesCircle, FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [usernameValid, setUsernameValid] = useState({
    length: false,
    format: false,
  });

  const [passwordValid, setPasswordValid] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  // Regex patterns for validation
  const usernameRegex = /^[a-zA-Z0-9_@]+$/; // Alphanumeric + _ @
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/; // Strong password

  // Validation helper
  const validateForm = ( data = formData ) => {
    const { username, password } = data;

    // Username validations
    if (!username || username.trim().length < 4 || username.trim().length > 20) {
      return "Username must be at least 4 characters long and It can be up to 20 characters.";
    }
    if (!usernameRegex.test(username.trim())) {
      return "Username can only contain letters, numbers, underscores (_) and @ symbol.";
    }

    // Password validations
    if (!password || password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!passwordRegex.test(password)) {
      return "Password must include uppercase, lowercase, number, and special character.";
    }

    // All validations passed
    return null;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "username") {
      const trimmed = value.trim();
      setUsernameValid({
        length: trimmed.length >= 4 && trimmed.length <= 20,
        format: usernameRegex.test(trimmed),
      });
    }

    if (name === "password") {
      setPasswordValid({
        length: value.length >= 6,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /\d/.test(value),
        specialChar: /[@#$%^&+=!]/.test(value),
      });
    }

    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Normalize username to lowercase
    const normalizedData = {
      ...formData,
      username: formData.username.trim().toLowerCase(),
    };

    // Validate using normalized data
    const validationError = validateForm(normalizedData);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      await signup(normalizedData);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const renderHint = (valid, label, index) => (
    <motion.li
      key={label}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ delay: index * 0.05, duration: 0.25 }}
      className={`flex items-center gap-2 text-sm ${valid ? "text-green-600" : "text-gray-500"}`}
    >
      {valid ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-gray-400" />}
      {label}
    </motion.li>
  );


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
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={formData.username}
              required
              disabled={loading}
              inputMode="latin"
              autoCapitalize="off"
              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/40 placeholder-gray-600 text-gray-800 border border-white/30 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400
                ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              onFocus={() => setUsernameFocused(true)}
              onBlur={() => setUsernameFocused(false)}
            />
          </div>

          <AnimatePresence mode="wait">
            {usernameFocused && Object.values(usernameValid).some((v) => !v) && (
              <motion.ul
                key="username-hints"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="px-4 py-2 mt-2 shadow-inner space-y-1 text-xs"
              >
                {renderHint(usernameValid.length, "4–20 characters", 0)}
                {renderHint(usernameValid.format, "Only letters, numbers, _ and @", 1)}
              </motion.ul>
            )}
          </AnimatePresence>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs text-gray-500 px-1 mt-1"
          >
            Username will be <span className="font-medium text-gray-700">stored in lowercase</span>.
          </motion.p>

          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              required
              disabled={loading}
              className={`w-full pl-10 pr-10 py-3 rounded-xl bg-white/40 placeholder-gray-600 text-gray-800 border border-white/30 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400
                ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-600 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {passwordFocused && Object.values(passwordValid).some((v) => !v) && (
              <motion.ul
                key="password-hints"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="px-4 py-2 mt-2 shadow-inner space-y-1 text-xs"
              >
                {renderHint(passwordValid.length, "At least 6 characters", 0)}
                {renderHint(passwordValid.uppercase, "Uppercase letter (A–Z)", 1)}
                {renderHint(passwordValid.lowercase, "Lowercase letter (a–z)", 2)}
                {renderHint(passwordValid.number, "At least one number", 3)}
                {renderHint(passwordValid.specialChar, "Special character (@#$%^&+=!)", 4)}
              </motion.ul>
            )}
          </AnimatePresence>

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
