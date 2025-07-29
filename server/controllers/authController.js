const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const User = require("../models/UserModel");

// Validation function
const validateSignup = (username, password) => {
  const errors = [];

  if (!username || username.length < 4 || username.length > 20) {
    errors.push("Username must be between 4 and 20 characters.");
  }

  if (!/^[a-zA-Z0-9_@]+$/.test(username)) {
    errors.push("Username can only contain letters, numbers, underscores, and @ symbol.");
  }


  if (!password || password.length < 6) {
    errors.push("Password must be at least 6 characters long.");
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/;
if (!passwordRegex.test(password)) {
  errors.push("Password must include uppercase, lowercase, number, and special character.");
}

  return errors;
};

const signup = async (req, res) => {
  const { username, password } = req.body;

  const validationErrors = validateSignup(username, password);
  if (validationErrors.length > 0) {
    return res.status(400).json({ msg: validationErrors.join(" ") });
  }

  try {
    const existingUser  = await User.findOne({ username: username.toLowerCase() });
    if (existingUser ) return res.status(400).json({ msg: "Username already exists!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username: username.toLowerCase(), password: hashedPassword });

    const token = generateToken(newUser);
    res.json({ token, username: newUser.username });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "Username and password are required." });
  }

  try {
    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user || !(await bcrypt.compare(password, user.password))) {
     return res.status(400).json({ msg: "Invalid credentials" });
    }
    const token = generateToken(user);
    res.json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};


module.exports = { signup, login };
