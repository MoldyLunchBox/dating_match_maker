const express = require('express');
const router = express.Router();
const { fetchInterests } = require('../models/interests');
const { fieldChecker, emailChecker } = require('../models/signUpFieldChecker');
const { validateToken } = require('../models/user');

router.get('/interests', fetchInterests)
router.post('/fieldCheck', fieldChecker)
router.post('/emailChecker', emailChecker)
router.post('/validateToken', validateToken)

module.exports = router;

