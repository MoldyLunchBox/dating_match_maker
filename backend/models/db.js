const mysql = require("mysql");
const dotenv = require("dotenv");
const { saveInfo, query } = require("../utils/utils");
const { categoriesData } = require("../utils/constants");

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
            //  create the friends table
            db.query(createFriendsTableQuery, (err, result) => {
              if (err) {
                console.error('Error creating friends table:', err);
                reject(err);
              } else {
                console.log('Friends table created successfully!');
                resolve();
              }
            });
            // create conversations table
            db.query(createConversationsTableQuery, (err, result) => {
              if (err) {
                console.error('Error creating conversations  table:', err);
                reject(err);
              } else {
                console.log('conversations table created successfully!');
                resolve();
              }
            });

            // create chat messages table
            db.query(createChatMessagesTableQuery, (err, result) => {
              if (err) {
                console.error('Error creating chat messages table:', err);
                reject(err);
              } else {
                console.log('chat messages table created successfully!');
                resolve();
              }
            });

            // create categories table
            db.query(createCategoriesTableQuery, async (err, result) => {
              if (err) {
                console.error('Error creating categories table:', err);
                reject(err);
              } else {
                console.log('categories table created successfully!');
                try {
                  // Check if categories exist in the table before inserting
                  db.query('SELECT COUNT(*) as count FROM categories', (err, countResult) => {
                    if (err) {
                      console.error('Error checking categories existence:', err);
                      reject(err);
                    } else {
                      const categoriesExist = countResult[0].count > 0;
            
                      if (!categoriesExist) {
                        // Insert categories into categories table
                        const insertCategoriesQuery = `INSERT INTO categories (name) VALUES ?`;
            
                        db.query(insertCategoriesQuery, [categoriesData], (err, insertResult) => {
                          if (err) {
                            console.error('Error inserting categories data:', err);
                            reject(err);
                          } else {
                            console.log('Categories inserted successfully!');
                            resolve();
                          }
                        });
                      } else {
                        console.log('Categories already exist, skipping insertion.');
                        resolve();
                      }
                    }
                  });
                } catch (err) {
                  console.error('Error creating categories and inserting data:', err);
                  reject(err);
                }
              }
            });
            // create  interests table
            db.query(createInterestsTableQuery, (err, result) => {
              if (err) {
                console.error('Error creating chat messages table:', err);
                reject(err);
              } else {
                console.log('chat messages table created successfully!');
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

const createConversationsTableQuery = `
CREATE TABLE IF NOT EXISTS conversations (
  conversation_id INT AUTO_INCREMENT PRIMARY KEY,
  user1_id INT NOT NULL,
  user2_id INT NOT NULL,
  last_message_time TIMESTAMP,
  FOREIGN KEY (user1_id) REFERENCES users (id),
  FOREIGN KEY (user2_id) REFERENCES users (id)
)
`;

const createChatMessagesTableQuery = `
CREATE TABLE IF NOT EXISTS chat_messages (
  message_id INT AUTO_INCREMENT PRIMARY KEY,
  conversation_id INT NOT NULL,
  sender_id INT NOT NULL,
  message_content TEXT,
  timestamp TIMESTAMP,
  FOREIGN KEY (conversation_id) REFERENCES conversations (conversation_id),
  FOREIGN KEY (sender_id) REFERENCES users (id)
);
`;

const createCategoriesTableQuery = `
CREATE  TABLE IF NOT EXISTS  categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);`

const createInterestsTableQuery = `
CREATE TABLE IF NOT EXISTS  interests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category_id INT,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);`

module.exports = {
  db,
  connectToDatabase,
};
