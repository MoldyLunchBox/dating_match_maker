const express = require('express');
const { db, connectToDatabase } = require('./models/db');
const port = 3001; // Set your desired port number
const userRoutes = require('./controllers/userRoutes'); // Import the userRoutes.js file
const indexRoute = require('./controllers/indexRoute'); // Import the userRoutes.js file
const home = require('./controllers/home'); // Import the userRoutes.js file
const cookieParser = require('cookie-parser');


const app = express();
app.use(express.json())
app.use(cookieParser())
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

(async () => {
  try {
    // Wait for the database connection to be established before starting the server
    await connectToDatabase();
    app.use('/', indexRoute);
    app.use('/', home);
    app.use('/users', userRoutes);

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Error starting the server:', err);
  }
})();
