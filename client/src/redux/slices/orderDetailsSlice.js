import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetOrderDetails } from "../api/orderDetails";


export const getOrderDetails = createAsyncThunk("getOrderDetails",apiGetOrderDetails);


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
