const express = require('express');
const router = express.Router();
const { registerUser,login, indexHandler, fetchUser, home } = require('../models/user');
const { jwtSecret } = require('../config');
const { authenticateUser } = require('../models/middleware');


router.get('/home', authenticateUser, home)
module.exports = router;
