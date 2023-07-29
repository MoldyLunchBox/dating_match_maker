const express = require('express');
const router = express.Router();
const { registerUser,login, indexHandler, fetchUser, home } = require('../models/user');
const { jwtSecret } = require('../config');
const { authenticateUser } = require('../models/middleware');

// Endpoint for user registration
router.post('/register',registerUser );
router.get('/fetchUser',fetchUser );
router.post('/login',login );
module.exports = router;
