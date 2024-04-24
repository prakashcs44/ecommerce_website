import axiosClient from "../../axiosClient.js";


export const apiGetProductDetails = async(id)=>{
   try{
    const link=`/product/${id}`
    const res = await axiosClient.get(link);
    return res.data;
   }
   catch(err){
    throw new Error(err.response.data?.message);
   }
};


