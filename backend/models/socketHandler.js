const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const { getConversations, sendMessage, requestMessage } = require('./socketEventHandler');
const { jwtSecret } = require('../config');
const { profileView, getUserData } = require('./SocketHandlers/profileView');



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
      socket.emit("getId", {id:id})
      socket.on('getConversations', (data) => getConversations(socket, data, id) );

      socket.on('sendMessage', (data) => sendMessage(socket, data, id, io) );
      socket.on('requestMessages', (data) => requestMessage(socket, data, id, io) );
      

      socket.on('profileView', (data) => profileView(socket, data, id) )

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
