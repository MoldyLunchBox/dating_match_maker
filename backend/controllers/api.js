const express = require('express');
const router = express.Router();
const { registerUser,login, indexHandler, fetchUser, home } = require('../models/user');
const { jwtSecret } = require('../config');
const { fetchInterests } = require('../models/interests');
router.get('/interests', fetchInterests)

module.exports = router;

