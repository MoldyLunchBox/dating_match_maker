const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

// Middleware function to check if the user is logged in
const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;
  console.log("authenticator")
  if (!token) {
    // Token is missing, user not logged in
    return res.status(401).json({ error: 'Unauthorized - Please log in.' });
  }

  try {
    // Verify the token and extract the user ID from it
    const decodedToken = jwt.verify(token, jwtSecret);
    req.userId = decodedToken.userId; // Attach the user ID to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    // Token is invalid or expired, user not logged in
    return res.status(401).json({ error: 'Unauthorized - Please log in.' });
  }
};

module.exports = { authenticateUser };
