const express = require('express');
const router = express.Router();
const { registerUser, indexHandler, fetchUser } = require('../models/user');


// Endpoint for user registration
router.post('/register',registerUser );
router.get('/fetchUser',fetchUser );

module.exports = router;
