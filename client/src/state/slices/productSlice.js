import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../axiosClient.js";


export const getProducts = createAsyncThunk("getProducts",async({keyword,page=1,price=[0,25000],category})=>{


   

   try{
    let link = `/product?page=${page}&max_price=${price[1]}&min_price=${price[0]}`;
    if(keyword){
      link = `${link}&keyword=${keyword}`;
    }
  
    if(category){
      link = `${link}&category=${category}`;
    }
   
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
  products:[],
  resultPerPage:0,
  productsCount:0,
}

const productSlice =  createSlice({
  name:"product",
  initialState,
  extraReducers:(builder)=>{
    builder.addCase(getProducts.fulfilled,(state,action)=>{
        state.loading = false;
        state.error = "";
        state.products = action.payload.products;
        state.resultPerPage = action.payload.resultPerPage;
        state.productsCount = action.payload.productsCount;
       
    }),
    builder.addCase(getProducts.rejected,(state,action)=>{
       state.loading = false;
       state.error = action.error.message;
    })

    builder.addCase(getProducts.pending,(state,action)=>{
      state.loading = true;
    })
  } ,
  reducers:{
    clearErrors(state,action){
      state.error = "";
   }
  }
})


export default productSlice.reducer;
