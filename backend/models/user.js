
const { db } = require('./db'); // Assuming you have a separate file for your database connection (db.js)
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const utils = require('../utils/utils');
const { log } = console
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



const registerUser = async (req, res) => {
    const { username, fname, lname, gender, password, email, avatar } = req.body;
    let { interests } = req.body
    interests = interests ? interests.split(",") : interests
    // Validation: Check if required data is present in the request body
    console.log(username, req.body)

    const verificationFailed = utils.verifyFields(req.body)
    if (verificationFailed) {
        log("check")
        return res.status(201).json({ error: verificationFailed });
    }
    try {
        // Check if the user already exists in the database
        console.log("got in register", interests)
        const userExistsQuery = 'SELECT * FROM users WHERE username = ?';
        const existingUser = await query(userExistsQuery, [username]);
        if (existingUser.length > 0) {
            return res.status(201).json({ error: 'Username already exists.' });
        }
        // // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // // Insert the new user into the database
        await utils.saveInfo("users", "(username, fname, lname, gender, password, email, avatar)", [username, fname, lname, gender, hashedPassword, email, avatar])
        const user = await utils.fetchInfo("users", "id", "username = ?", username)
        interests.map(async (interest) => {
            const ok = await utils.saveUserInterest(user[0].id, interest)
        })
        // Send a successful response
        res.status(201).json({ msg: 'User registered successfully.' });
    } catch (err) {
        console.error('Error during user registration:', err);
        res.status(201).json({ error: 'Something went wrong. Please try again later.' });
    }
}

const fetchUser = async (req, res) => {
    const { username } = req.query;
    console.log(username, req.body)
    // Validation: Check if required data is present in the request body
    if (!username) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        // Check if the user already exists in the database
        const userExistsQuery = 'SELECT * FROM users WHERE username = ?';
        let user = await query(userExistsQuery, [username]);
        if (user.length) {
            user = user[0]
            res.status(201).json({ message: user });

        }
        else
            return res.status(409).json({ error: 'Username already exists.' });


    } catch (err) {
        console.error('Error during user registration:', err);
        res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
}

const login = async (req, res) => {
    const { username, password } = req.body
    console.log("yoooooooooo", username, password)
    // Create a JWT token and send it in a cookie
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }
    try {
        // Check if the user already exists in the database
        const userExistsQuery = 'SELECT * FROM users WHERE username = ?';
        let user = await query(userExistsQuery, [username]);
        const passwordMatch = user.length ? await bcrypt.compare(password, user[0].password) : false
        if (user.length && passwordMatch) {
            const token = jwt.sign({ userId: user[0].id }, jwtSecret, {
                expiresIn: '1h', // Set the token expiration time (adjust as needed)
            });

            //   res.cookie('token', token, {
            //     httpOnly: true,
            //     maxAge: 3600000, // Set the cookie expiration time (1 hour in this case)
            //   });

            // res.status(201).json({ message: true });
            log("it worked user was found")
            res.status(201).json({ token: token });

        }
        else {
            log("nooo user")
            return res.status(201).json({ error: "user doesnt exist" });
        }



    } catch (err) {
        console.error('Error during user registration:', err);
        res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
}

const home = (req, res) => {
    console.log("im home")
    res.status(201).json({ message: "yay im home" });


}
const indexHandler = (req, res) => {
    res.send('Hello, World!');
};




const me = async (req, res) => {
    const token = req.cookies.token;
    console.log("authenticator", token)
    if (!token) {
        // Token is missing, user not logged in
        console.log("no token", token)

        return res.status(201).json({ error: 'Unauthorized - Please log in.' });
    }

    try {
        // Verify the token and extract the user ID from it
        const decodedToken = jwt.verify(token, jwtSecret);
        const userId = decodedToken.userId; // Attach the user ID to the request object
        const userExistsQuery = 'SELECT fname, lname, username, gender , email FROM users WHERE id = ?';
        let user = await query(userExistsQuery, [userId]);
        const currentInterestsId = await utils.fetchInfo("user_interests", "interest_id", "user_id =?", userId)
        let interests = null
        if (currentInterestsId.length) {
            console.log("yo", currentInterestsId)
            const currentInterestsNames = await Promise.all(currentInterestsId.map(async (interest_id) => {
                // console.log(interest_id.interest_id)
                return await utils.fetchInfo("interests", "name", "id =?", interest_id.interest_id)
            }
            ))
            interests = currentInterestsNames.map((elem) => (elem[0].name))
            console.log("there are the current interests", interests)

        }
        if (user && user[0]) {
            console.log(user[0])
            res.status(201).json({ msg: user[0], interests: interests });
        }

        else
            res.status(201).json({ error: "no such user" });


    } catch (err) {
        // Token is invalid or expired, user not logged in
        console.log(err)
        return res.status(201).json({ error: 'Unauthorized - Please log in.' });
    }
};

const searchUsers = async (req, res) => {
    const { word } = req.body;
    console.log("word", word)

    // Validation: Check if required data is present in the request body
    if (!word) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const token = req.cookies.token;
        if (!token) {
            // Token is missing, user not logged in
            return res.status(201).json({ error: 'Unauthorized - Please log in.' });
        }
        const decodedToken = jwt.verify(token, jwtSecret);
        const id = decodedToken.userId; // Attach the user ID to the request object

        // Check if the user already exists in the database
        const userSearchQuery = `
  SELECT *
  FROM users
  WHERE LOWER(username) LIKE ? OR LOWER(fname) LIKE ? OR LOWER(lname) LIKE ?
`;
        const searchTerm = `%${word.toLowerCase()}%`; //  % symbols for partial matching

        log("before", searchTerm)
        let users = await query(userSearchQuery, [searchTerm, searchTerm, searchTerm]);
        log("after")
        console.log(users)
        if (users.length) {
            const arr = await Promise.all(users.map(async (e) => {
                let status = null
                const alreadyFriends = 'SELECT confirmed FROM friends WHERE user_id = ? AND friend_id = ?';
                let iAdded = await query(alreadyFriends, [id, e.id]);
                let theyAdded = await query(alreadyFriends, [e.id, id]);
                log("i added", iAdded)
                log("they added", theyAdded)
                if (iAdded.length) {
                    if (iAdded[0].confirmed)
                        status = "friend"
                    else
                        status = "pending"
                }
                else if (theyAdded.length) {
                    log("done............................................ ", theyAdded[0].confirmed)
                    if (theyAdded[0].confirmed) {

                        status = "friend"
                    }
                    else
                        status = "accept"
                }

                return (
                    {
                        username: e.username,
                        fname: e.fname,
                        lname: e.lname,
                        avatar: e.avatar,
                        gender: e.gender,
                        id: e.id,
                        status: status,

                    }
                )
            }))
            log(arr)
            res.status(201).json({ msg: arr });

        }
        else
            return res.status(201).json({ error: 'There are no matches available' });


    } catch (err) {
        console.error('Error during user registration:', err);
        res.status(201).json({ error: 'Something went wrong. Please try again later.' });
    }
}

const updateProfil = async (req, res) => {
    try {
        const token = req.cookies.token;
        console.log("authenticator for edit", token)
        // if (!token) {
        //     // Token is missing, user not logged in
        //     console.log("no token", token)

        //     return res.status(201).json({ error: 'Unauthorized - Please log in.' });
        // }
        // const decodedToken = jwt.verify(token, jwtSecret);
        // const id = decodedToken.userId; // Attach the user ID to the request object

        // // Handle profile data updates (first name, email, etc.)
        // let { fname, lname, gender, avatar, interests } = req.body;
        // fname = fname && fname.length ? fname : null
        // lname = lname && lname.length ? lname : null
        // gender = gender && gender.length ? gender : null
        // avatar = avatar && avatar.length ? avatar : null
        // utils.updateInterests(id, interests)

        // console.log("yay the end", avatar)

        // let users = await query(utils.updateQuery, [fname, fname, lname, lname, gender, gender, avatar, avatar, id]);
        // console.log(users)
        // res.status(200).json({ msg: 'Profile updated successfully!' });

    }
    catch (err) {

        console.log(err)
        res.status(200).json({ error: err });

    }
}

const validateToken = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(201).json({ valid: false });
    }

    try {
        // Verify the token using the same secret key used during token generation
        const decoded = jwt.verify(token, jwtSecret);
    console.log("verifyign tken", decoded, !decoded.userId, !decoded.exp) 

        if (!decoded || !decoded.userId || !decoded.exp){
        return res.status(201).json({ valid: false })
    }
    const user = await utils.fetchInfo("users", "id", "id =?", decoded.userId)
    if (user && user.length) {
        // Get the current Unix timestamp in seconds
        const currentTimestamp = Math.floor(Date.now() / 1000);
        
        if (decoded.exp < currentTimestamp) {
            //   the token has expired
            return res.status(201).json({ valid: false })
            
        }
        else{
            console.log("verifyign is trueeeeeeee") 
                return res.status(201).json({ valid: true })}
        }
        return res.status(201).json({ valid: false })

    } catch (error) {
        // Token verification failed, send an invalid response
        return res.status(200).json({ valid: false });
    }
}

module.exports = {
    indexHandler,
    registerUser,
    fetchUser,
    login,
    home,
    searchUsers,
    me,
    updateProfil,
    validateToken,
};