import axiosClient  from "../../axiosClient";


export const getAllUsers = async ()=>{
    try{
     const link =  "/user/all";
     const res = await axiosClient.get(link);
     return res.data.users;
    }
    catch(err){
        throw new Error(err.response.data?.message);
    }
}

export const getSingleUser = async (id)=>{
    try{
     const link =  `/user/all/${id}`;
     const res = await axiosClient.get(link);
     return res.data.user;
    }
    catch(err){
        throw new Error(err.response.data?.message);
    }
}

export const updateUserRole = async (d)=>{
    
    try{
        const {id,data} = d;
     const link =   `/user/update-role/${id}`;
     const res = await axiosClient.put(link,data);
     return res.data.user;
    }
    catch(err){
        throw new Error(err.response.data?.message);
    }
}