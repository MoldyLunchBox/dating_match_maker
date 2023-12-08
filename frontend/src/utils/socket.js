import io from 'socket.io-client';

export const mySocket = (token) => {
    console.log("my token  is ", token)
   return  io('http://localhost:3001', {
        headers: { token: token },
    })
}

