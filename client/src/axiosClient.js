import axios from "axios";
//https://ecommerce-website-lm3b.onrender.com/api

const axiosClient = axios.create({
    baseURL: `http://localhost:4000/api`,
    headers:{
      "Content-Type":"application/json",
    },
    withCredentials:true,
   
  });


export default axiosClient;