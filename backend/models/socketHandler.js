const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const { getConversations, sendMessage, requestMessage } = require('./socketEventHandler');
const { jwtSecret } = require('../config');
const { profileView, getUserData, profileLike } = require('./SocketHandlers/profileView');
var cookie = require('cookie')
const connectedSockets = new Map();

const setupSocketServer = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: 'http://localhost:3000', // Replace with your frontend URL
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    try {
      // const cooki =  socket.handshake.headers
      // console.log("hello")
      // console.log( "cookie :::::::::: ", cooki.token)
      // const {token} =  cookie.parse(cooki); //does not translate; // Access the token from the query parameter
      // console.log('A user connected', token);
      console.log("socker token check", socket.handshake.headers.token)
      const decodedToken = jwt.verify(socket.handshake.headers.token, jwtSecret);
      const id = decodedToken.userId; // Attach the user ID to the request object
      connectedSockets.set(id, socket);
      socket.emit("getId", { id: id })
      socket.on('getConversations', (data) => getConversations(socket, data, id));
      socket.on('sendMessage', (data) => sendMessage(socket, data, id, io));
      socket.on('requestMessages', (data) => requestMessage(socket, data, id, io));
      socket.on('profileView', (data) => profileView(socket, data, id))
      socket.on('profileLike', (data) => profileLike(socket, data, id))
      socket.on('joinRoom', (data) => {
        socket.join(roomId);
      });
      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
    } catch (err) {
      socket.disconnect();
      console.log(socket.handshake.headers.token,  ' has a wrong token')
    }
  });
};

module.exports = {
  setupSocketServer,
  connectedSockets,
};
