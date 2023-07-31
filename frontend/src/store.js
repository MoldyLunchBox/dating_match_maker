// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './redux/reducers';

const store = configureStore({
  reducer: rootReducer,
  // Add any middleware or enhancers you need here
});

export default store;