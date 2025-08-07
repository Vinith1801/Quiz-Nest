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
  let { username, password } = req.body;

  username = username.trim().toLowerCase();

  const validationErrors = validateSignup(username, password);
  if (validationErrors.length > 0) {
    return res.status(400).json({ msg: validationErrors.join(" ") });
  }

  try {
    const existingUser  = await User.findOne({ username: username});
    if (existingUser ) return res.status(400).json({ msg: "Username already exists!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    const token = generateToken(newUser);
    // res.json({ token, username: newUser.username });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ msg: "Signup successful", user: { username: newUser.username, id: newUser._id } });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

const login = async (req, res) => {
  let { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "Username and password are required." });
  }

  username = username.trim().toLowerCase();

  try {
    const user = await User.findOne({ username });
    if (!user) {
  console.log("User not found for username:", username);
  return res.status(400).json({ msg: "Invalid credentials" });
}

const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
  console.log("Password mismatch for user:", username);
  return res.status(400).json({ msg: "Invalid credentials" });
}
    const token = generateToken(user);
    // res.json({ token, id: user._id, username: user.username });
    res.cookie("token", token, {
     httpOnly: true,
     secure: process.env.NODE_ENV === "production",
     sameSite: "None",
     maxAge: 24 * 60 * 60 * 1000,
    });
  res.json({ msg: "Login successful", user: { username: user.username, id: user._id } });
  } catch (err) {
    console.error("Login Error:", err); 
    res.status(500).json({ msg: "Server error" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  });
  res.json({ msg: "Logged out" });
};

const me = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  res.json({ user: { id: req.user.id, username: req.user.username } });
};


module.exports = { signup, login, logout, me };
