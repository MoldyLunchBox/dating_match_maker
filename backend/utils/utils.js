const { db } = require("../models/db");

function sanitizeInput(input) {
    // Escape special characters that could be used for SQL injection
    // You may also use libraries like 'mysql' or 'pg' to handle this safely
    return input.replace(/['";\\]/g, '');
}

const fetchInfo = async (table, fields, clause, values) => {
    try {

        const getUser = `SELECT ${fields} FROM ${table} WHERE ${clause}`;
        console.log(table, fields, clause, values)
        let user = await query(getUser, values);
        return user
    } catch (err) {
        console.log("fetch user failed", err)
    }

}

const updateQuery = `
      UPDATE users
      SET fname = CASE WHEN ? != '' THEN ? ELSE fname END,
          lname = CASE WHEN ? != '' THEN ? ELSE lname END,
          gender = CASE WHEN ? != '' THEN ? ELSE gender END,
          avatar = CASE WHEN ? != '' THEN ? ELSE avatar END
      WHERE id = ?
    `;
const query = (sql, values) => {
    try {

        return new Promise((resolve, reject) => {
            db.query(sql, values, (err, results) => {
                console.log("what the fuck")
                if (err)
                    reject(err)
                else
                    resolve(results)
            })
        })
    } catch (err) {
        console.log("database query  error")
    }
}


module.exports = {
    sanitizeInput,
    updateQuery,
    query,
    fetchInfo,
};