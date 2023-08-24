const express = require('express');
const router = express.Router();
const { fetchInterests } = require('../models/interests');
const { fieldChecker, emailChecker } = require('../models/signUpFieldChecker');
router.get('/interests', fetchInterests)
router.post('/fieldCheck', fieldChecker)
router.post('/emailChecker', emailChecker)

module.exports = router;

