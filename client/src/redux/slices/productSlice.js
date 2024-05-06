import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetProducts } from "../api/product";


export const getProducts = createAsyncThunk("getProducts",apiGetProducts);


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
   },
  }
})


export default productSlice.reducer;
