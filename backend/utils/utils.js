function sanitizeInput(input) {
    // Escape special characters that could be used for SQL injection
    // You may also use libraries like 'mysql' or 'pg' to handle this safely
    return input.replace(/['";\\]/g, '');
}

const updateQuery = `
      UPDATE users
       SET fname = ?, lname = ?, gender = ?
      WHERE id = ?;
    `;

module.exports = {
    sanitizeInput,
    updateQuery,
};