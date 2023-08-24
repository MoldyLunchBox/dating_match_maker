const express = require('express');
const router = express.Router();
const { fetchInterests } = require('../models/interests');
const { fieldChecker } = require('../models/signUpFieldChecker');
router.get('/interests', fetchInterests)
router.post('/fieldCheck', fieldChecker)

module.exports = router;

