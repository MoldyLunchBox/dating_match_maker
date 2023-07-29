
const { db } = require('./db'); // Assuming you have a separate file for your database connection (db.js)
const bcrypt = require('bcrypt');

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
    const { username, fname, lname, gender, password, email } = req.query;
    // Validation: Check if required data is present in the request body
    console.log(username, req.body)

    if (!username || !fname || !lname || !gender || !password || !email) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        // Check if the user already exists in the database
        const userExistsQuery = 'SELECT * FROM users WHERE username = ?';
        const existingUser = await query(userExistsQuery, [username]);
        if (existingUser.length > 0) {
            return res.status(409).json({ error: 'Username already exists.' });
        }

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const insertUserQuery = 'INSERT INTO users (username, fname, lname, gender, password, email) VALUES (?, ?, ?, ?, ?, ?)';
        await db.query(insertUserQuery, [username, fname, lname, gender, hashedPassword, email]);

        // Send a successful response
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (err) {
        console.error('Error during user registration:', err);
        res.status(500).json({ error: 'Something went wrong. Please try again later.' });
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
        if (user.length ) {
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

const indexHandler = (req, res) => {
    res.send('Hello, World!');
};

module.exports = {
    indexHandler,
    registerUser,
    fetchUser,
};