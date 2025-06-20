const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ msg: "No token, access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Contains `id`
    next();
  } catch (err) {
    console.log(err);
    
    res.status(400).json({ msg: "Token is not valid" });
  }
};

module.exports = verifyToken;
