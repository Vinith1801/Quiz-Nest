const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token, access denied" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token, access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Contains `id and username`
    next();
  } catch (err) {
    console.log(err);
    
    res.status(400).json({ msg: "Token is not valid" });
  }
};

module.exports = verifyToken;
