import axiosClient from "../../axiosClient";

export const apiGetProducts = async({keyword,page=1,price=[100,40000],category})=>{

    try{
     let link = `/product?page=${page}&max_price=${price[1]}&min_price=${price[0]}`;
     if(keyword){
       link = `${link}&keyword=${keyword}`;
     }
   
     if(category){
       link = `${link}&category=${category}`;
     }
    
      const res = await axiosClient.get(link);
   
      return res.data;
    }
    catch(err){
     throw new Error(err.response.data?.message);
    }
   
   
 };
 