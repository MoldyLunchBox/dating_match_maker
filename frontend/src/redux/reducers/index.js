import { combineReducers } from 'redux';
import reducers from './slicer'; // Correct import
const rootReducer = combineReducers({
  auth: reducers.auth,
  modals: reducers.modals,
  chat: reducers.chat,
  profile: reducers.profile,
  socket: reducers.socket,

  // Add other reducers here if needed
});

export default rootReducer;
