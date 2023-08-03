
const { db } = require('./db'); // Assuming you have a separate file for your database connection (db.js)
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const utils = require('../utils/utils');
const {log} = console
const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, results) => {
            console.log("what the fuck")
            if (err)
                reject(err)
            else
                resolve(results)
        })
    })
}

const registerUser = async (req, res) => {
    const { username, fname, lname, gender, password, email } = req.body;
    // Validation: Check if required data is present in the request body
    console.log(username, req.body)

    if (!username || !fname || !lname || !gender || !password || !email) {
        log("check")
        return res.status(201).json({ error: 'All fields are required.' });
    }
    try {
        // Check if the user already exists in the database
        const userExistsQuery = 'SELECT * FROM users WHERE username = ?';
        const existingUser = await query(userExistsQuery, [username]);
        if (existingUser.length > 0) {
            return res.status(201).json({ error: 'Username already exists.' });
        }

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const insertUserQuery = 'INSERT INTO users (username, fname, lname, gender, password, email) VALUES (?, ?, ?, ?, ?, ?)';
        await db.query(insertUserQuery, [username, fname, lname, gender, hashedPassword, email]);

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
        else{
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




const me = (req, res) => {
    const token = req.cookies.token;
    console.log("authenticator")
    if (!token) {
        // Token is missing, user not logged in
        return res.status(401).json({ error: 'Unauthorized - Please log in.' });
    }

    try {
        // Verify the token and extract the user ID from it
        const decodedToken = jwt.verify(token, jwtSecret);
        req.userId = decodedToken.userId; // Attach the user ID to the request object
        res.status(201).json({ message: true });

    } catch (err) {
        // Token is invalid or expired, user not logged in
        return res.status(401).json({ error: 'Unauthorized - Please log in.' });
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
        // Check if the user already exists in the database
        const userSearchQuery = `
  SELECT *
  FROM users
  WHERE LOWER(username) LIKE ? OR LOWER(fname) LIKE ? OR LOWER(lname) LIKE ?
`;
        const searchTerm = word // searchTerm is the user's input for search
        log("before",searchTerm)
        let users = await query(userSearchQuery, [searchTerm, searchTerm, searchTerm]);
        log("after")
        console.log(users)
        if (users.length) {
            const amap = users.map((e)=> e.username)
            log(amap)
            users = users[0]
            res.status(201).json({ message: users });

        }
        else
            return res.status(409).json({ error: 'Username already exists.' });


    } catch (err) {
        console.error('Error during user registration:', err);
        res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
}

module.exports = {
    indexHandler,
    registerUser,
    fetchUser,
    login,
    home,
    searchUsers,
};