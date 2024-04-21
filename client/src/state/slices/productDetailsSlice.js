import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../axiosClient.js";


export const getProductDetails = createAsyncThunk("getProductDetails",async(id)=>{
   try{
    const link=`/product/${id}`
    const res = await axiosClient.get(link);
    return res.data;
   }
   catch(err){
    throw new Error(err.response.data?.message);
   }
})




const initialState = {
  loading:false,
  error:"",
  product:{},
}

const productDetailsSlice =  createSlice({
  name:"productDetails",
  initialState,
  extraReducers:(builder)=>{
    builder.addCase(getProductDetails.fulfilled,(state,action)=>{
        state.loading = false;
        state.error = "";
        state.product = action.payload.product;
    }),
    builder.addCase(getProductDetails.rejected,(state,action)=>{
       state.loading = false;
       state.error = action.error.message;
    })

    builder.addCase(getProductDetails.pending,(state,action)=>{
      state.loading = true;
      
    })
  }  ,
  reducers:{
    clearErrors(state,action){
       state.error = "";
    }
  }
})


export default productDetailsSlice.reducer;
