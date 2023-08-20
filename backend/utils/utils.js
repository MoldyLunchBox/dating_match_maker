
function sanitizeInput(input) {
    // Escape special characters that could be used for SQL injection
    // You may also use libraries like 'mysql' or 'pg' to handle this safely
    return input.replace(/['";\\]/g, '');
}
const query = (sql, values) => {
    const { db } = require("../models/db");
    try {
        return new Promise((resolve, reject) => {
            db.query(sql, values, (err, results) => {
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

const getInterestID = async (interestName) => {
    const getInterestIDQuery = 'SELECT id FROM interests WHERE name = ?';
    const result = await query(getInterestIDQuery, [interestName]);
    return result[0].id;
};

// Step 2: Insert User Interest
const saveUserInterest = async (userId, interestName) => {
    try {
        const interestId = await getInterestID(interestName);
        console.log(interestId, "interest", interestName)

        const insertUserInterestQuery = 'INSERT INTO user_interests (user_id, interest_id) VALUES (?, ?)';
        await query(insertUserInterestQuery, [userId, interestId]);
        console.log('User interest saved successfully');
    } catch (error) {
        console.error('Error saving user interest:', error);
    }
};

const updateInterests = async (userId, interests) => {
    const currentInterests = await fetchInfo("user_interests", "interest_id", "user_id =?", userId)
    console.log("fuck heres the current interests", currentInterests)
    const newInterests = await Promise.all(interests.split(",").map(async (elem) => await getInterestID(elem)))
    const deletedInterests = currentInterests.filter(currentInterest => !newInterests.includes(currentInterest.interest_id));
    const addedInterests = newInterests.filter(newInterest => !currentInterests.some(currentInterest => currentInterest.interest_id === newInterest));
    console.log("fuck heres the new interests", newInterests)
    console.log("fuck heres the deleted interests", deletedInterests)
    console.log("fuck heres the added interests", addedInterests)
    // Delete old interests
    for (const deletedInterest of deletedInterests) {
        const deleteQuery = "DELETE FROM user_interests WHERE user_id = ? AND interest_id = ?";
        await query(deleteQuery, [userId, deletedInterest.interest_id]);
    }
    // Add new interests
    for (const addedInterestId of addedInterests) {
        const insertQuery = "INSERT INTO user_interests (user_id, interest_id) VALUES (?, ?)";
        await query(insertQuery, [userId, addedInterestId]);
    }
    console.log("Interests updated successfully");
}

module.exports = {
    sanitizeInput,
    updateQuery,
    updateInterests,
    query,
    fetchInfo,
    saveInfo,
    saveUserInterest,
};