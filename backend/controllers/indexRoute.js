const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { indexHandler } = require('../models/user');


// Endpoint for user registration
router.get('/',indexHandler );

module.exports = router;
