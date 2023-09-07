const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const multer = require('multer');
const path = require('path');

// Middleware function to check if the user is logged in
const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;
  console.log("authenticator middleware")
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("yo")
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    console.log("heres the file name", uniqueSuffix + fileExtension)
    if (file.mimetype.startsWith('image/')){
    cb(null, uniqueSuffix + fileExtension);
      req.body.avatar = `http://localhost:3001/uploads/${uniqueSuffix + fileExtension}`;

  } else {
    // Reject the file upload by providing an error message
    console.log("upload bad")

    req.body.avatar = null
    cb(new Error('Only image files are allowed!'), false);
    }
  },
});

const upload = multer({ storage });


module.exports = { authenticateUser, upload };
