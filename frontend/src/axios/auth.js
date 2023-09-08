import axiosInstance from './instance'; // Import your custom Axios instance

async function checkTokenValidity() {
    try {
        console.log(":checking validity")
        const response = await axiosInstance.post('http://localhost:3001/api/validateToken')
        console.log(":response validity")
       console.log(response)
        return(response.data.valid);

      } catch (error) {
        console.error('Error validating token:', error);

        return(false);

      }
    }
    
  export { checkTokenValidity };