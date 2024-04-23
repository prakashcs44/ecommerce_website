import axios from "axios";

const axiosClient = axios.create({
    baseURL: `https://ecommerce-website-three-sepia-59.vercel.app/api`,
    headers:{
      "Content-Type":"application/json",
    },
    withCredentials:true,
   
  });


export default axiosClient;