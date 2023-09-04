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
  },
});

const modalSlice = createSlice({
  name: 'modals',
  initialState :{
    searchFriend : null,
    registered : null,
  },
  reducers: {
    setSearchFriend: (state, action) => {
      state.searchFriend = action.payload;
    }, 
    setRegistered: (state, action) => {
      state.registered = action.payload;
    },
  },
});


const chatSlice = createSlice({
  name: 'chat',
  initialState :{
    conversations : null,
    messages: [],
    selectedConversation: null,
  },
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
  },
});

const socketSlice = createSlice({
  name: 'socket',
  initialState :{
    socket : null,
  },
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});


console.log(modalSlice)
export const { setToken } = authSlice.actions;
export const { setSearchFriend } = modalSlice.actions;
export const { setRegistered } = modalSlice.actions;
export const { setConversations } = chatSlice.actions;
export const { setSelectedConversation } = chatSlice.actions;
export const { setMessages } = chatSlice.actions;
export const { setSocket } = socketSlice.actions;

const reducers = {
  auth: authSlice.reducer,
  modals: modalSlice.reducer,
  chat: chatSlice.reducer,
  socket: socketSlice.reducer,
};

export default reducers;