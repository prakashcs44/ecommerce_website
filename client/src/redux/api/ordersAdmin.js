import axiosClient  from "../../axiosClient";


export const getAllOrders = async ()=>{
    try{
     const link =  "/order/all";
     const res = await axiosClient.get(link);
     return res.data.orders;
    }
    catch(err){
        throw new Error(err.response.data?.message);
    }
}

export const deleteOrder = async (id)=>{
    try{
     const link =  `/order/${id}`;
     const res = await axiosClient.delete(link);
     return 
    }
    catch(err){
        throw new Error(err.response.data?.message);
    }
}

export const updateOrder = async (d)=>{
    
    try{
        const {id,data} = d;
     const link =   `/order/${id}`;
     const res = await axiosClient.put(link,data);
     return res.data.order;
    }
    catch(err){
        throw new Error(err.response.data?.message);
    }
}


export const getSingleOrder = async (id)=>{
    try{
        const link =  `/order/all/${id}`;
        const res = await axiosClient.get(link);
        return res.data.order;
       }
       catch(err){
           throw new Error(err.response.data?.message);
       }
}