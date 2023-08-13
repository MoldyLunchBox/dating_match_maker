// socketHandlers.js
import { useDispatch, useSelector } from 'react-redux';
import { setConversations, setMessages } from '../redux/reducers/slicer';


const receiveMessageHandler = (msg, dispatch) => {
  console.log("receiveMessageHandler", msg.msg);
  console.log("first index", msg.msg[0].message_content);
  dispatch(setMessages(msg.msg))
};
// socketHandlers.js
const getConversations = (msg, dispatch) => {
    console.log("conversations", msg.msg);
    console.log("first index", msg.msg[0]);
    dispatch(setConversations(msg.msg))
  };
  
  export { receiveMessageHandler, getConversations };