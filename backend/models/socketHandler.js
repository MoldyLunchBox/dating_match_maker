const socketIo = require('socket.io');
const mysql = require('mysql');
const { db } = require('./db'); // Assuming you have a separate file for your database connection (db.js)
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getConversations } = require('./socketEventHandler');



const setupSocketServer = (server) => {
    const io = socketIo(server, {
        cors: {
          origin: 'http://localhost:3000', // Replace with your frontend URL
          methods: ['GET', 'POST'],
          credentials: true,
        },
      });

  io.on('connection', (socket) => {
    try{

      const token = socket.handshake.query.token; // Access the token from the query parameter
      console.log('A user connected', token);
      const decodedToken = jwt.verify(token, jwtSecret);
      const id = decodedToken.userId; // Attach the user ID to the request object
      
      socket.on('getConversations', getConversations);

      socket.on('sendMessage', (data) => {
        const { conversationId, message } = data;
        console.log("message received")
      });
      
      socket.on('joinRoom', (data) => {
        socket.join(roomId);
      });
      
      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
    } catch (err){
      console.log(err)
    }
    });
};

module.exports = setupSocketServer;
