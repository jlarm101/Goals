const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  });
};

// Middleware to extract the user ID from the authentication token
const extractUserId = (req, res, next) => {
  
  const token = req.headers.authorization;

  // Verify and decode the token to extract the user ID
  const decoded = jwt.verify(token, 'your-secret-key');
  const userId = decoded.userId;

  // Assign the user ID to the request object for later use
  req.userId = userId;

  next();
};


module.exports = authenticateToken, extractUserId;