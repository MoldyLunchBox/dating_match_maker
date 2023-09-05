import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { getConversations, receiveMessageHandler } from '../../utils/chat';
import { useDispatch, useSelector } from 'react-redux';
import { ChatBuble } from '../ChatBuble';
import { setSelectedConversation } from '../../redux/reducers/slicer';
import {mySocket} from '../../utils/socket'; // Import the socket instance
const Chat = () => {

    const token = useSelector((state) => state.auth.token);
    const conversations = useSelector((state) => state.chat.conversations)
    const messages = useSelector((state) => state.chat.messages)
    const selectedConversation = useSelector((state) => state.chat.selectedConversation)
    const messagesRef = useRef();
    const [socket, setSocket] = useState(null);

    const [me, setMe] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        // Scroll to the bottom of the messages container when new messages are added
        if (messagesRef && messagesRef.current)
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }, [messages]);

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
            socket.emit("requestMessages", { conversation_id: conversation.conversation_id })
        }
        // setMessages([]);
    };

    useEffect(() => {
        console.log("this is token", token)
        const newSocket = mySocket(token)
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socket) {
            socket.emit('getConversations', { data: "hello myself" });


            socket.on('getId', (msg) => setMe(msg.id));

            socket.on('receiveMessage', (msg) => receiveMessageHandler(msg, dispatch));
            socket.on('getConversations', (msg) => getConversations(msg, dispatch));
            if (selectedConversation) {
                socket.emit("requestMessages", { conversation_id: selectedConversation.conversation_id })

            }
            return () => {
                // proper cleanup
                // socket.off('receiveMessage', receiveMessageHandler);
                socket.off('getConversations', getConversations);
            };
        }
    }, [socket]);

    return (
        <div className="  flex bg-gray-100  h-[calc(100vh-56px)] ">
            <div className="w-1/4 bg-blue-500 text-white p-4   ">
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
            <div className="flex-1 h-full ">
                {selectedConversation && (
                    <div className='bg-[#F5F5F5]   divide-y   '>
                        <div className="bg-[#F5F5F5] text-black  ">
                            <h2 className="text-lg m-5 font-semibold">
                                Chat with {selectedConversation.name}
                            </h2>
                        </div>

                        <div ref={messagesRef} className="p-2 max-h-[calc(100vh-197px)]  min-h-[calc(100vh-197px)] overflow-y-auto   ">
                            {messages.map((message, index) => (
                                <ChatBuble key={index} isMe={me === message.sender_id} message={message} />
                            ))}
                        </div>
                        <div className="   p-4   flex">
                            <input
                                className="w-full  rounded-lg px-2 py-1 focus:outline-none"
                                type="text"
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button
                                className="  h-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                                onClick={handleSendMessage}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;
