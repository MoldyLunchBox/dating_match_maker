const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({ path: './.env' });
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});


// Export a function that returns a promise
const connectToDatabase = () => {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      if (err) {
        console.error('Error connecting to the database:', err);
        reject(err);
      } else {
        console.log('MySQL connected successfully!');
        db.query(createUsersTableQuery, (err, result) => {
          if (err) {
            console.error('Error creating users table:', err);
            reject(err);
          } else {
            console.log('Users table created successfully!');
            // Now create the friends table
            db.query(createFriendsTableQuery, (err, result) => {
              if (err) {
                console.error('Error creating friends table:', err);
                reject(err);
              } else {
                console.log('Friends table created successfully!');
                resolve();
              }
            });
          }
        });
      }
    });
  });
};

const createUsersTableQuery = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  fname VARCHAR(255) NOT NULL,
  lname VARCHAR(255) NOT NULL,
  gender VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
   avatar VARCHAR(255) DEFAULT 'http://localhost:3001/uploads/defaultAvatar.jpg',  
  email VARCHAR(255) NOT NULL
)
`;

const createFriendsTableQuery = `
  CREATE TABLE IF NOT EXISTS friends (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    friend_id INT NOT NULL,
    confirmed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (friend_id) REFERENCES users (id)
  )
`;
// Create the users table if it doesn't exist


module.exports = {
  db,
  connectToDatabase,
};
