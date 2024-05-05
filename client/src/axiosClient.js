import axios from "axios";
const serverUri= import.meta.env.VITE_SERVER_URI;





  const axiosClient = axios.create({
    baseURL: serverUri,
    headers:{
      "Content-Type":"application/json",
    },
    withCredentials:true,
   
  });



export default axiosClient;