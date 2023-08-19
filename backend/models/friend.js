
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

const friends = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            // Token is missing, user not logged in
            console.log("no token", token)

            return res.status(201).json({ error: 'Unauthorized - Please log in.' });
        }
        const decodedToken = jwt.verify(token, jwtSecret);
        const id = decodedToken.userId; // Attach the user ID to the request object
        const getFriends = 'SELECT * FROM friends WHERE (user_id = ? OR friend_id = ?) AND confirmed = true ';

        let friends = await query(getFriends, [id, id]);
        if (friends.length) {
            const arr = await Promise.all(friends.map(async (e) => {
                let status = null
                const getfriend = 'SELECT username , fname, lname, avatar, gender, id   FROM users WHERE id = ? ';
                let friend = await query(getfriend, [id == e.user_id ? e.friend_id : e.user_id,]);
                if (friend && friend.length)
                    return (
                        {
                            username: friend[0].username,
                            fname: friend[0].fname,
                            lname: friend[0].lname,
                            avatar: friend[0].avatar,
                            gender: friend[0].gender,
                            id: friend[0].id,
                            status: "chat",

                        }
                    )
            }))
        

            res.status(200).json({ msg: arr });

        }
        else
            res.status(200).json({ msg: null });
    }
    catch (err) {

        console.log(err)
        res.status(200).json({ error: err });

    }
}

const requests = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            // Token is missing, user not logged in
            console.log("no token", token)

            return res.status(201).json({ error: 'Unauthorized - Please log in.' });
        }
        const decodedToken = jwt.verify(token, jwtSecret);
        const id = decodedToken.userId; // Attach the user ID to the request object
        const getFriends = 'SELECT * FROM friends WHERE (user_id = ? OR friend_id = ?) AND confirmed = false ';

        let friends = await query(getFriends, [id, id]);
        if (friends.length) {
            const arr = await Promise.all(friends.map(async (e) => {
                let status = null
                const getfriend = 'SELECT username , fname, lname, avatar, gender, id  FROM users WHERE id = ? ';
                let friend = await query(getfriend, [id == e.user_id ? e.friend_id : e.user_id,]);
                console.log("delet this", friend)
                if (friend && friend.length)
                    return (
                        {
                            username: friend[0].username,
                            fname: friend[0].fname,
                            lname: friend[0].lname,
                            avatar: friend[0].avatar,
                            gender: friend[0].gender,
                            id: friend[0].id,
                            status: "accept",

                        }
                    )

            }))
            res.status(200).json({ msg: arr });

        }
        else
            res.status(200).json({ msg: null });
    }
    catch (err) {

        console.log(err)
        res.status(200).json({ error: err });

    }
}

const addFriend = async (req, res) => {
    try {
        const token = req.cookies.token;
        let { username } = req.body;
        if (!token || !username) {
            // Token is missing, user not logged in
            console.log("no token", token)

            return res.status(201).json({ error: 'Unauthorized - Please log in.' });
        }
        const decodedToken = jwt.verify(token, jwtSecret);
        const id = decodedToken.userId; // Attach the user ID to the request object
        const userExistsQuery = 'SELECT * FROM users WHERE username = ?';
        let users = await query(userExistsQuery, [username]);
        if (users.length) {
            const alreadyAdded = 'SELECT confirmed FROM friends WHERE user_id = ? AND friend_id = ? ';
            let toAccept = await query(alreadyAdded, [users[0].id, id]);
            if (toAccept.length) {
                const confirmQuery = 'UPDATE friends SET confirmed = true WHERE user_id = ? AND friend_id = ? AND confirmed = false';
                const insertQuery = 'INSERT INTO conversations ( user1_id,  user2_id) VALUES (?, ?)';

                await query(confirmQuery, [users[0].id, id]);
                await query(insertQuery, [users[0].id, id]);
                console.log("accepted friend")
            }
            else {
                let friend = await query(alreadyAdded, [id, users[0].id]);
                if (!friend.length) {
                    const insertQuery = 'INSERT INTO friends (user_id, friend_id) VALUES (?, ?)';
                    let userss = await query(insertQuery, [id, users[0].id]);
                    console.log("i think it worked")
                    res.status(200).json({ msg: 'user added succesfully!' });
                }
                else {
                    res.status(200).json({ error: 'already friends!' });
                    console.log("already friends")
                }
            }
        }
        else
            res.status(200).json({ error: 'user not found' });
    }
    catch (err) {

        console.log(err)
        res.status(200).json({ error: err });

    }
}


module.exports = {

    addFriend,
    friends,
    requests,
};