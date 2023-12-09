import io from 'socket.io-client';

let socketInstance = null;

export const mySocket = () => {
  if (!socketInstance) {
    // If the socket instance does not exist, create a new one
    socketInstance = io('http://localhost:3001', {
      withCredentials: true,
    });
  }

  return socketInstance;
};
