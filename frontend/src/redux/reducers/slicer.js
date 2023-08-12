// authSlice.js
import { createSlice } from '@reduxjs/toolkit';



const initialState = {
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      console.log("action dispatched")
      state.token = action.payload;
    },
    // Add other reducers for different states here
    // Example:
    // setUsername: (state, action) => {
    //   state.username = action.payload;
    // },
    // setPassword: (state, action) => {
    //   state.password = action.payload;
    // },
  },
});

const modalSlice = createSlice({
  name: 'modals',
  initialState :{
    searchFriend : null
  },
  reducers: {
    setSearchFriend: (state, action) => {
      state.searchFriend = action.payload;
    },
  },
});


const chatSlice = createSlice({
  name: 'chat',
  initialState :{
    conversations : null
  },
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
  },
});

console.log(modalSlice)
export const { setToken } = authSlice.actions;
export const { setSearchFriend } = modalSlice.actions;
export const { setConversations } = chatSlice.actions;

const reducers = {
  auth: authSlice.reducer,
  modals: modalSlice.reducer,
  chat: chatSlice.reducer,
};

export default reducers;