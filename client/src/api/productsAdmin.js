import axiosClient  from "../axiosClient";

export const getAllProducts = async ()=>{

    try{
    const link = "/product/all";
    const res = await axiosClient.get(link);
    return res.data.products;

    }
    catch(err){
       throw new Error(err.response.data?.message);
    }

}


export const createProduct = async (data)=>{
    try{
       const link  = "/product/new";
       const config = {headers:{"Content-Type":"multipart/form-data"}};
       const res = await axiosClient.post(link,data,config);
       return res.data.product;
    }

    catch(err){
        throw new Error(err.response.data?.message);
    }
}

export const updateProduct =  async (d)=>{
    
    try{
        const {id,data} = d;
       const link  = `/product/${id}`;
       const config = {headers:{"Content-Type":"multipart/form-data"}};
       const res = await axiosClient.put(link,data,config);
       return res.data.product;
    }

    catch(err){
        throw new Error(err.response.data?.message);
    }
}

export const deleteProduct =  async (id)=>{
    
    try{
       
       const link  = `/product/${id}`;
       const res = await axiosClient.delete(link);
        return;
    }

    catch(err){
        throw new Error(err.response.data?.message);
    }
}


export const getSingleProduct = async (id)=>{
    try{
     const link =  `/product/all/${id}`;
     const res = await axiosClient.get(link);
     return res.data.product;
    }
    catch(err){
        throw new Error(err.response.data?.message);
    }
}
