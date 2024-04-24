import axiosClient from "../../axiosClient.js";


export const apiGetOrderDetails =async(id)=>{
   
   try{
    const link=`/order/${id}`;
    const res = await axiosClient.get(link);
    return res.data;
   }
   catch(err){
    throw new Error(err.response.data?.message);
   }
};
