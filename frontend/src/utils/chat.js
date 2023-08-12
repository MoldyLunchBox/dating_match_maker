// socketHandlers.js
import { useDispatch, useSelector } from 'react-redux';
import { setConversations } from '../redux/reducers/slicer';

const receiveMessageHandler = (msg) => {
  console.log("Message received:", msg);
};

// socketHandlers.js
const getConversations = (msg, dispatch) => {
    console.log("conversations", msg.msg);
    console.log("first index", msg.msg[0]);
    dispatch(setConversations(msg.msg))
  };
  export { receiveMessageHandler, getConversations };