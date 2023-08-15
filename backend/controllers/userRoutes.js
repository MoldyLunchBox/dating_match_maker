const express = require('express');
const router = express.Router();
const { registerUser,login, indexHandler, fetchUser, home, me, searchUsers, updateProfil } = require('../models/user');
const { jwtSecret } = require('../config');
const { authenticateUser, upload } = require('../models/middleware');
const { addFriend, friends, requests } = require('../models/friend');
const { getConversations, getConversation } = require('../models/chat');

// Endpoint for user registration
router.post('/register',registerUser );
router.get('/fetchUser',fetchUser );
router.get('/me',me );
router.post('/searchUsers',searchUsers );

router.post('/addFriend', addFriend );
router.get('/friends', friends );
router.get('/requests', requests );

router.get('/getConversations', getConversations)
router.post('/getConversationId', getConversation)

router.post('/editProfil', upload.single('avatar'),updateProfil)
router.post('/login',login);
module.exports = router;
