// SocketContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { mySocket } from '../utils/socket';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Create the Socket.io instance and set it in state
        // const socketInstance = io('http://localhost:3001', { withCredentials: true });
        const socketInstance = mySocket();
        setSocket(socketInstance);

        // Cleanup: Disconnect the socket when the component unmounts
        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    return useContext(SocketContext);
};
