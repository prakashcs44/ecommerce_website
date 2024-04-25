import axios from "axios";
import onDev from "../dev.js"

const axiosClient = axios.create({
    baseURL: onDev?"http://localhost:4000/api":`https://ecommerce-website-lm3b.onrender.com/api`,
    headers:{
      "Content-Type":"application/json",
    },
    withCredentials:true,
   
  });


export default axiosClient;