import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetProductDetails } from "../api/productDetails.js";


export const getProductDetails = createAsyncThunk("getProductDetails",apiGetProductDetails)




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
