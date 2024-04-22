import axios from "axios";

const axiosClient = axios.create({
    baseURL: `https://ecommerce-website-ashen-phi.vercel.app/api`,
    headers:{
      "Content-Type":"application/json",
    },
    withCredentials:true,
   
  });


export default axiosClient;