const express = require('express');
const router = express.Router();
const { registerUser,login, indexHandler, fetchUser, home, me } = require('../models/user');
const { jwtSecret } = require('../config');
const { authenticateUser } = require('../models/middleware');
const { addFriend } = require('../models/friend');

// Endpoint for user registration
router.post('/register',registerUser );
router.get('/fetchUser',fetchUser );
// router.get('/me',me );

router.post('/addFriend',addFriend );


router.post('/login',login );
module.exports = router;
