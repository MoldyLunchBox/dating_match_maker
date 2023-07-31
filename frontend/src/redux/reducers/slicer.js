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
console.log(authSlice.actions)
export const { setToken } = authSlice.actions;
export default authSlice.reducer;
