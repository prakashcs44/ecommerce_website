import axios from "axios";


const axiosClient = axios.create({
    baseURL: `https://ecommerce-website-lm3b.onrender.com/api`,
    headers:{
      "Content-Type":"application/json",
    },
    withCredentials:true,
   
  });


export default axiosClient;