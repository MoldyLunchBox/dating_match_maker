function sanitizeInput(input) {
    // Escape special characters that could be used for SQL injection
    // You may also use libraries like 'mysql' or 'pg' to handle this safely
    return input.replace(/['";\\]/g, '');
}

const updateQuery = `
      UPDATE users
      SET fname = CASE WHEN ? != '' THEN ? ELSE fname END,
          lname = CASE WHEN ? != '' THEN ? ELSE lname END,
          gender = CASE WHEN ? != '' THEN ? ELSE gender END
      WHERE id = ?
    `;

module.exports = {
    sanitizeInput,
    updateQuery,
};