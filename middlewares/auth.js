const jwt = require("jsonwebtoken");
exports.auth = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) return res.json({ message: "Access Denied " });
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verifyToken;
    next();
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
