const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // decoded token
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(403).json({ message: 'Invalid or Expired Token' });
  }
};
