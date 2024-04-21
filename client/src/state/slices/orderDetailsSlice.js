import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../axiosClient.js";


export const getOrderDetails = createAsyncThunk("getOrderDetails",async(id)=>{
   
   try{
    const link=`/order/${id}`;
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
  order:{},
}

const orderDetailsSlice =  createSlice({
  name:"orderDetails",
  initialState,
  extraReducers:(builder)=>{
    builder.addCase(getOrderDetails.fulfilled,(state,action)=>{
        state.loading = false;
        state.error = "";
        state.order = action.payload.order;
    }),
    builder.addCase(getOrderDetails.rejected,(state,action)=>{
       state.loading = false;
       state.error = action.error.message;
    })

    builder.addCase(getOrderDetails.pending,(state,action)=>{
      state.loading = true;
      
    })
  } ,
  reducers:{
    clearErrors(state,action){
      state.error = "";
   }
  } 
})


export default orderDetailsSlice.reducer;
