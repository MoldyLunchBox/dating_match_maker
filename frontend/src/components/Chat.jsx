import React, { useState } from 'react';

const Chat = () => {
    const [conversations, setConversations] = useState([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Alex Johnson' },
    ]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            const updatedMessages = [...messages, newMessage];
            setMessages(updatedMessages);
            setNewMessage('');
        }
    };

    const handleConversationClick = (conversation) => {
        setSelectedConversation(conversation);
        setMessages([]);
    };

    return (
        <div className="h-screen flex bg-gray-100">
            <div className="w-1/4 bg-blue-500 text-white p-4">
                <h1 className="text-2xl font-semibold">Conversations</h1>
                <div className="mt-4">
                    {conversations.map((conversation) => (
                        <div
                            key={conversation.id}
                            className={`p-2 cursor-pointer ${selectedConversation === conversation ? 'bg-blue-600' : ''
                                }`}
                            onClick={() => handleConversationClick(conversation)}
                        >
                            {conversation.name}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                {selectedConversation && (
                    <>
                        <div className="bg-blue-500 text-white p-2">
                            <h2 className="text-lg font-semibold">
                                Chat with {selectedConversation.name}
                            </h2>
                        </div>
                        <div className="mt-4">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`rounded-lg p-2 mt-2 ${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'
                                        }`}
                                >
                                    {message}
                                </div>
                            ))}
                        </div>
                        <div className="bg-white p-4 border-t ">
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
