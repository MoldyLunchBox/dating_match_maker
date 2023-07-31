import { combineReducers } from 'redux';
import authReducer from './slicer';

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here if needed
});

export default rootReducer;
