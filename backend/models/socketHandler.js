const socketIo = require('socket.io');
const mysql = require('mysql');
const { db } = require('./db'); // Assuming you have a separate file for your database connection (db.js)



const setupSocketServer = (server) => {
    const io = socketIo(server, {
        cors: {
          origin: 'http://localhost:3000', // Replace with your frontend URL
          methods: ['GET', 'POST'],
          credentials: true,
        },
      });

  io.on('connection', (socket) => {
    console.log('A user connected');

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
  });
};

module.exports = setupSocketServer;
