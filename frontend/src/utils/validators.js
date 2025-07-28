// src/utils/validators.js

export const usernameRegex = /^[a-zA-Z0-9_@]+$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/;

export const validateUsername = (username) => {
  if (!username || username.trim().length < 4 || username.trim().length > 20) {
    return "Username must be between 4 and 20 characters.";
  }
  if (!usernameRegex.test(username.trim())) {
    return "Username can only contain letters, numbers, underscores (_) and @ symbol.";
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password || password.length < 6) {
    return "Password must be at least 6 characters long.";
  }
  if (!passwordRegex.test(password)) {
    return "Password must include uppercase, lowercase, number, and special character.";
  }
  return null;
};
