const socketIo = require('socket.io');

let ioInstance = null;

function getIo(server) {
  if (!ioInstance) {
    ioInstance = socketIo(server, {
      cors: {
        origin: 'http://localhost:3000', // Replace with your frontend URL
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });
  }
  return ioInstance;
}

module.exports = getIo;
