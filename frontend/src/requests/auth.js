import axiosInstance from './instance'; // Import your custom Axios instance

async function checkTokenValidity() {
    try {
        const response = await axiosInstance.post('/api/validateToken')
        return(response.data.valid);

      } catch (error) {
        console.error('Error validating token:', error);

        return(false);

      }
    }
    
  export { checkTokenValidity };