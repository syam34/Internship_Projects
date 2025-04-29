const jwt = require("jsonwebtoken");
const JWT_SECRET = "c605b56bb03ba6f1552af27d4922846271d7cdebfb4cb9bc68110d2a68667217ab73ed7d8f239515f9f85927419bb808cc5802b3d8f0ea9507578862e04b1c59";

module.exports = function (req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).send({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(400).send({ message: "Invalid token" });
  }
};
