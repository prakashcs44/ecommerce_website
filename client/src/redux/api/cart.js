import axiosClient from "../../axiosClient";

export const apiAddItemToCart = async(data)=>{
    const link = `/user/cart/add`;
    const config = {withCredentials:true};
    try{
      
     const res = await axiosClient.post(link,data,config);
    
     const items = res.data?.cart;
     return items.map(item=>{
      return {
        quantity:item.quantity,
        ...item.product
      }
    })
     
    }
  
    catch(err){
      throw new Error(err.response.data?.message||"Something went wrong");
    }
  };
  
  
  export const apiRemoveItemFromCart = async(productId)=>{
    const link = `/user/cart/remove`;
    const config = {withCredentials:true};
    const data = {productId};
    try{
     const res = await axiosClient.post(link,data,config);
     const items = res.data?.cart;
     
     return items.map(item=>{
      return {
        quantity:item.quantity,
        ...item.product
      }
    })
    }
  
  
  
  
    catch(err){
      throw new Error(err.response.data?.message||"Something went wrong");
    }
  
  };
  
  export const apiGetCartItems = async()=>{
      const link = "/user/cart";
      const config = {withCredentials:true};
      try{
  
        const res = await axiosClient.get(link,config);
        const items = res.data?.cart;
         return items.map(item=>{
          return {
            quantity:item.quantity,
            ...item.product
          }
        })
       
        
      }
      catch(err){
        throw new Error(err.response.data?.message||"Something went wrong");
      }
  };