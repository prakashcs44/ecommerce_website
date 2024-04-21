import { createSlice,createAsyncThunk, configureStore } from "@reduxjs/toolkit";
import axiosClient from "../../axiosClient.js";



export const addItemToCart = createAsyncThunk("addItemToCart",async(data)=>{
  const link = `/user/cart/add`;
  const config = {withCredentials:true};
  try{
    
   const res = await axiosClient.post(link,data,config);
   return res.data;
  }

  catch(err){
    throw new Error(err.response.data?.message||"Something went wrong");
  }
})


export const removeItemFromCart = createAsyncThunk("removeItemFromCart",async(productId)=>{
  const link = `/user/cart/remove`;
  const config = {withCredentials:true};
  const data = {productId};
  try{
   const res = await axiosClient.post(link,data,config);
   return res.data;
  }




  catch(err){
    throw new Error(err.response.data?.message||"Something went wrong");
  }

})

export const getCartItems = createAsyncThunk("getCardItems",async()=>{
    const link = "/user/cart";
    const config = {withCredentials:true};
    try{

      const res = await axiosClient.get(link,config);
      return res.data;
      
    }
    catch(err){
      throw new Error(err.response.data?.message||"Something went wrong");
    }
})



const initialState = {
  cartItems:[],
  error:"",
  loading:false,
  shippingInfo:localStorage.getItem("shipping_info")?
  JSON.parse(localStorage.getItem("shipping_info")):{},
}

const cartSlice =  createSlice({
  name:"cart",
  initialState,
  extraReducers:(builder)=>{
    builder.addCase(addItemToCart.fulfilled,(state,action)=>{
        state.cartItems =action.payload.cart;
        state.error="";
        state.loading = false;
    })
    .addCase(addItemToCart.rejected,(state,action)=>{
        state.error=action.error.message;
        state.loading = false;

    })
    .addCase(addItemToCart.pending,(state,action)=>{
        state.loading = true;
    })
    .addCase(removeItemFromCart.fulfilled,(state,action)=>{
      state.cartItems = action.payload.cart;
      state.error="";
      state.loading = false;
    })
    .addCase(removeItemFromCart.rejected,(state,action)=>{
      state.error = action.error.message;
      state.loading = false;
    })
    .addCase(removeItemFromCart.pending,(state,action)=>{
      state.loading = true;
    })
    .addCase(getCartItems.fulfilled,(state,action)=>{
      state.cartItems = action.payload.cart;
      state.error="";
      state.loading = false;
    })
    .addCase(getCartItems.rejected,(state,action)=>{
      state.error = action.error.message;
      state.loading = false;
    })
    .addCase(getCartItems.pending,(state,action)=>{
      state.loading=true;
    })
    
  },
  reducers:{
     saveShippingInfo(cartState,action){
       cartState.shippingInfo = action.payload;
       localStorage.setItem("shipping_info",JSON.stringify(cartState.shippingInfo));
     },
     clearErrors(state,action){
        state.error = "";
        
     }
  },
})

export const {saveShippingInfo,clearErrors} = cartSlice.actions;
export default cartSlice.reducer;
