const express = require('express');
const mysql = require("mysql")
const dotenv = require("dotenv")
const app = express();
const port = 3000; // Set your desired port number

dotenv.config({path:'./.env'})
// mysql connection
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
})

db.connect((err) => {
  if (err) 
    console.log(err)
  else 
    console.log("MYSQLs connected")
  
})

const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
  )
`;
db.query(createUsersTableQuery, (err, result) => {
  if (err) {
    console.error("Error creating users table:", err);
  } else {
    console.log("Users table created successfully! ");
  }
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});