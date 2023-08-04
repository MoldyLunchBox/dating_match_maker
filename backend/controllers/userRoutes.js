const express = require('express');
const router = express.Router();
const { registerUser,login, indexHandler, fetchUser, home, me, searchUsers } = require('../models/user');
const { jwtSecret } = require('../config');
const { authenticateUser, upload } = require('../models/middleware');
const { addFriend } = require('../models/friend');

// Endpoint for user registration
router.post('/register',registerUser );
router.get('/fetchUser',fetchUser );
router.get('/me',me );
router.post('/searchUsers',searchUsers );

router.post('/addFriend',addFriend );

router.post('/editProfil', upload.single('avatar'), async (req, res) => {
    try {
        // Handle profile data updates (first name, email, etc.)
        const { firstName, email } = req.body;
        console.log("yay the end", req.body)
        res.status(200).json({ msg: 'Profile updated successfully!' });

    }
     catch (err){

         console.log(err)
        res.status(200).json({ error: err });

        } 
    })
router.post('/login',login );
module.exports = router;
