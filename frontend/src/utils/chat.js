// socketHandlers.js
const receiveMessageHandler = (msg) => {
    console.log("Message received:", msg);
  };
  
  // socketHandlers.js
const getConversations = (msg) => {
    console.log("conversations", msg);
  };
  export { receiveMessageHandler, getConversations };