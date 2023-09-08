import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001',  
  withCredentials: true, // Include cookies in cross-origin requests
});

export default instance;
