const express = require('express');
const {  connectToDatabase } = require('./models/db');
const port = 3001; // Set your desired port number
const userRoutes = require('./controllers/userRoutes'); // Import the userRoutes.js file
const indexRoute = require('./controllers/indexRoute'); // Import the userRoutes.js file
const apiRoute = require('./controllers/api'); // Import the userRoutes.js file
const cookieParser = require('cookie-parser');
const cors = require('cors'); // Import the cors package
const path = require('path');
const http = require('http');
const {setupSocketServer} = require('./models/socketHandler');


const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json())
app.use((err, req, res, next) => {
  console.log("wtf is this unhandled error stuff")
  console.error('Unhandled Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

(async () => {
  try {
    // Wait for the database connection to be established before starting the server
    await connectToDatabase();
    app.use(cookieParser())
    app.use('/', indexRoute);
    app.use('/api',   apiRoute);
    // app.use('/', home);
    app.use('/users',  userRoutes);
    //this middleware to serve static files from the 'uploads' directory
    setupSocketServer(server)
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

   // Start the server using the existing 'server' instance
   server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
  } catch (err) {
    console.error('Error starting the server:', err);
  }
})();
