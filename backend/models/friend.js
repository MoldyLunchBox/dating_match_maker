
const { db } = require('./db'); // Assuming you have a separate file for your database connection (db.js)
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
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

const addFriend = async(res,req) =>{

   console.log("adding a friend ",req.query)
    
}


module.exports = {

    addFriend,
};