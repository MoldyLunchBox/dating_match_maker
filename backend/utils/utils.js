const { db } = require("../models/db");

function sanitizeInput(input) {
    // Escape special characters that could be used for SQL injection
    // You may also use libraries like 'mysql' or 'pg' to handle this safely
    return input.replace(/['";\\]/g, '');
}
const query = (sql, values, db) => {
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
const fetchInfo = async (table, fields, clause, values) => {
    try {

        const getUser = `SELECT ${fields} FROM ${table} ${clause ? "WHERE " + clause : ""}`;

        console.log(getUser)
        let user = await query(getUser, values);
        return user
    } catch (err) {
        console.log("fetch user failed", err)
    }

}
const saveInfo = async (table, fields, values) => {
    try {
        const timestampIndex = fields.split(',').map(f => f.trim()).indexOf('timestamp');
        
        if (timestampIndex !== -1) {
            fields = fields.replace(', timestamp', '');
            values.splice(timestampIndex, 0, 'CURRENT_TIMESTAMP');
        }

        const valuePlaceholders = new Array(values.length).fill('?').join(', ');
        const saveInfoQuery = `INSERT INTO ${table} ${fields} VALUES (${valuePlaceholders})`;

        console.log("saveInfoQuery", saveInfoQuery);
        console.log("values", values);

        let saved = await query(saveInfoQuery, values);
        console.log("info is saved", saved);

        return saved;
    } catch (err) {
        console.log("fetch user failed", err);
    }
};


const updateQuery = `
      UPDATE users
      SET fname = CASE WHEN ? != '' THEN ? ELSE fname END,
          lname = CASE WHEN ? != '' THEN ? ELSE lname END,
          gender = CASE WHEN ? != '' THEN ? ELSE gender END,
          avatar = CASE WHEN ? != '' THEN ? ELSE avatar END
      WHERE id = ?
    `;



module.exports = {
    sanitizeInput,
    updateQuery,
    query,
    fetchInfo,
    saveInfo,
};