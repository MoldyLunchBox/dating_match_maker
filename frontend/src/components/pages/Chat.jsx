import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { getConversations, receiveMessageHandler } from '../../utils/chat';
import { useDispatch, useSelector } from 'react-redux';
import { ChatBuble } from '../ChatBuble';
import { setSelectedConversation } from '../../redux/reducers/slicer';

const Chat = () => {

    const token = useSelector((state) => state.auth.token);
    const conversations = useSelector((state) => state.chat.conversations)
    const messages = useSelector((state) => state.chat.messages)
    const selectedConversation = useSelector((state) => state.chat.selectedConversation)

    const [me, setMe] = useState(null)
    const dispatch = useDispatch()

    const [socket, setSocket] = useState(null);
    console.log(conversations)
    // const [selectedConversation, setSelectedConversation] = useState(null);
    // const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            const updatedMessages = [...messages, newMessage];
            // setMessages(updatedMessages);

            if (socket) {
                socket.emit('sendMessage', {
                    message: newMessage,
                    conversation_id: selectedConversation.conversation_id
                });
            }
            setNewMessage('');
        }
    };

    const handleConversationClick = (conversation) => {
        dispatch(setSelectedConversation(conversation))
        if (socket) {
            console.log("requestion this messqge ", conversation.conversation_id)
            socket.emit("requestMessages", {conversation_id: conversation.conversation_id})
        }
        // setMessages([]);
    };

    useEffect(() => {
        console.log("this is token", token)
        const newSocket = io('http://localhost:3001', {
            query: { token: token }, // Pass the user token as a query parameter
        }); // Replace with your server URL
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socket) {
            socket.emit('getConversations', { data: "hello myself" });


            socket.on('getId', (msg) => setMe(msg.id));

            socket.on('receiveMessage', (msg)=> receiveMessageHandler(msg, dispatch));
            socket.on('getConversations', (msg) => getConversations(msg, dispatch));
            if (selectedConversation){
            socket.emit("requestMessages", {conversation_id: selectedConversation.conversation_id})

            }
            return () => {
                // proper cleanup
                // socket.off('receiveMessage', receiveMessageHandler);
                socket.off('getConversations', getConversations);
            };
        }
    }, [socket]);

    return (
        <div className="h-screen flex bg-gray-100">
            <div className="w-1/4 bg-blue-500 text-white p-4">
                <h1 className="text-2xl font-semibold">Conversations</h1>
                <div className="mt-4">

                    {conversations ?
                        conversations.map((conversation, index) => (
                            <div
                                key={index}
                                className={`p-2 cursor-pointer ${selectedConversation && selectedConversation.conversation_id === conversation.conversation_id ? 'bg-blue-600' : ''
                                    }`}
                                onClick={() => handleConversationClick(conversation)}
                            >
                                {conversation.name}
                            </div>
                        ))
                        : null
                    }
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 ">
                {selectedConversation && (
                    <>
                        <div className="bg-blue-500 text-white p-2">
                            <h2 className="text-lg font-semibold">
                                Chat with {selectedConversation.name}
                            </h2>
                        </div>
                        <div className="mt-4 overflow-y-auto  max-h-[50%]">
                            {messages.map((message, index) => (
                                // <div
                                //     key={index}
                                //     className={`rounded-lg p-2 mt-2 ${message.sender_id == me ? 'bg-gray-200' : 'bg-white'
                                //         }`}
                                // >
                                //     {message.message_content } {}
                                // </div>
                                <ChatBuble key={index} isMe={me === message.sender_id} message={message} />
                            ))}
                        </div>
                        <div className="bg-white p-4 border-t">
                            <input
                                className="w-full border rounded-lg px-2 py-1 focus:outline-none"
                                type="text"
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button
                                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                                onClick={handleSendMessage}
                            >
                                Send
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Chat;
