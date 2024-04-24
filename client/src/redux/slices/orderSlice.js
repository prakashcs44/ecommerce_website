import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { apiCreateOrder,apiMyOrders } from "../api/order";






export const createOrder = createAsyncThunk("createOrder",apiCreateOrder);



export const myOrders = createAsyncThunk("myOrders",apiMyOrders);








const initialState = {
 error:"",
 orders:[],
 status:"",
}

const orderSlice =  createSlice({
  name:"order",
  initialState,
  extraReducers:(builder)=>{
    builder.addCase(createOrder.fulfilled,(state,action)=>{
       state.status = "success";
    })
    .addCase(createOrder.rejected,(state,action)=>{
          state.error = action.error.message;
          state.status = "fail";
    })
    .addCase(createOrder.pending,(state,action)=>{
      state.status = "loading";
    })
    .addCase(myOrders.pending,(state,action)=>{
      state.status = "loading";
    })
    .addCase(myOrders.fulfilled,(state,action)=>{
      state.orders = action.payload.orders;
      state.status = "success";
    })
    .addCase(myOrders.rejected,(state,action)=>{
      state.success = "fail";
    })
  },
    
  
  reducers:{
    clearStatus(state,action){
      state.error = "";
   }
  }
})

export const {clearStatus} = orderSlice.actions;
export default orderSlice.reducer;
