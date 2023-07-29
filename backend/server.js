const express = require('express');
const { db, connectToDatabase } = require('./models/db');
const app = express();
const port = 3000; // Set your desired port number
const userRoutes = require('./controllers/userRoutes'); // Import the userRoutes.js file
const indexRoute = require('./controllers/indexRoute'); // Import the userRoutes.js file

(async () => {
  try {
    // Wait for the database connection to be established before starting the server
    await connectToDatabase();
    app.use(express.json())
    app.use('/', indexRoute);
    app.use('/users', userRoutes);

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Error starting the server:', err);
  }
})();
