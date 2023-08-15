const { db } = require('./db'); // Assuming you have a separate file for your database connection (db.js)
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const { fetchInfo } = require('../utils/utils');
const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, results) => {
            if (err)
                reject(err)
            else
                resolve(results)
        })
    })
}


const addToChat = async (req, res) => {
    try {
        const token = req.cookies.token;
        const {username} = req.body
        if (!token || !username) {
            // Token is missing, user not logged in
            console.log("no token", token)

            return res.status(201).json({ error: 'Unauthorized - Please log in.' });
        }
        const decodedToken = jwt.verify(token, jwtSecret);
        const id = decodedToken.userId; // Attach the user ID to the request object
        const getFriends = 'SELECT * FROM friends WHERE (user_id = ? OR friend_id = ?) AND confirmed = true ';
        
    } catch(err){
        console.log(err)
    }
}

const getConversations = async (req, res) => {
    try {
        const token = req.cookies.token;
        const {username} = req.body
        if (!token || !username) {
            // Token is missing, user not logged in
            console.log("no token", token)

            return res.status(201).json({ error: 'Unauthorized - Please log in.' });
        }
        const decodedToken = jwt.verify(token, jwtSecret);
        const id = decodedToken.userId; // Attach the user ID to the request object
        const getConversations = 'SELECT * FROM conversations WHERE user_id = ? OR friend_id = ? ';
        let conversations = await query(getConversations, [id, id]);
        if (conversations && conversations.length){
            const arr = await Promise.all(conversations.map((e)=>{
                return({
                    name: `${e.fname} ${e.lname}`,
                    timeRecent: e.last_message_time,
                    userId: e.user_id == id ? e.friend_id : e.user_id
                })
            }))
            console.log(arr)
            return res.status(201).json({ msg: 'good' });

        }
        
    } catch(err){
        console.log(err)
    }
}

const getConversationId = async (req, res) => {
    try {
        const token = req.cookies.token;
        const {user_id} = req.body
        if (!token || !user_id) {
            // Token is missing, user not logged in
            console.log("no token or userid", token, user_id)
            return res.status(201).json({ error: 'Unauthorized - Please log in.' });
        }
        const decodedToken = jwt.verify(token, jwtSecret);
        const id = decodedToken.userId; // Attach the user ID to the request object
        // const getConversations = 'SELECT * FROM conversations (WHERE user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?) ';
        const conversations = await fetchInfo("conversations", "conversation_id", "(user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)",[user_id, id, id, user_id])
        console.log(conversations)
       
        // let conversations = await query(getConversations, [user_id, id, id, user_id]);
        if (conversations && conversations.length){
        
            console.log(conversations)
            return res.status(201).json({ msg: conversations[0].conversation_id });

        }
        
    } catch(err){
        console.log(err)
    }
}


module.exports = {

    addToChat,
    getConversations,
    getConversationId,
};