import axiosClient from "../../axiosClient";


export const apiLogin = async(data)=>{
    
    const link = `/user/login`;
   
    const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
 
    try{
     const res = await axiosClient.post(link,data,config);
     return res.data;
    }
    catch(err){
     throw new Error(err.response.data?.message);
    }
   
   
 
}
 
 
 export const apiRegister = async(data)=>{
 
 
  
 
    const link = `/user/register`;
    const config = { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true };
    try{
     const res = await axiosClient.post(link,data,config);
     return res.data;
    }
    catch(err){
     throw new Error(err.response.data?.message)
    }
    
 }
 
 
 
 
 export const apiLoadUser = async()=>{
     const link = `/user/me`;
     const config = { withCredentials: true}
     const res = await axiosClient.get(link,config);
     
    return res.data;
 
 };
 
 
 export const apiLogout = async()=>{
     const link = `/user/logout`;
     const config = { withCredentials: true}
     const res = await axiosClient.get(link,config);
     return res.data;
 }
 
 
 
 export const apiUpdateProfile = async(data)=>{
     
     
     try{
         const link = `/user/me/update`;
         const config = { headers: { "Content-Type": "multipart/form-data" },withCredentials:true};
         const res = await axiosClient.put(link,data,config);
         return res.data;
     }
     catch(err){
         throw new Error(err.response.data?.message);
     }
   
 };
 
 
 export const apiChangePassword = async(data)=>{
     const link = `/user/password/update`;
     const config = {withCredentials:true};
     const res = await axiosClient.put(link,data,config);
     return res.data;
 };
 