import { combineReducers } from 'redux';
import reducers from './slicer'; // Correct import
const rootReducer = combineReducers({
  auth: reducers.auth,
  modals: reducers.modals,

  // Add other reducers here if needed
});

export default rootReducer;
