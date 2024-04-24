import axiosClient from "../../axiosClient.js";






export const apiCreateOrder = async(data)=>{
    try{
     const link = "/order/new";
    const response  =  await axiosClient.post(link,data);
    return response.data;
    }
    catch(err){
      throw new Error(err.response.data?.message);
    }
};


export const apiMyOrders = async()=>{
  try{
   const link = "/order/me";
  const response  =  await axiosClient.get(link);
  return response.data;
  }
  catch(err){
    throw new Error(err.response.data?.message);
  }
};


