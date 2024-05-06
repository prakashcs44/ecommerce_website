import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetProducts } from "../api/product";


export const getProducts = createAsyncThunk("getProducts",apiGetProducts);


const initialState = {
  loading:false,
  error:"",
  products:[],
  resultPerPage:0,
  productsCount:0,
  page:1,
  price:[100,40000],
  keyword:"",
  category:"",
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
   setKeyword(state,action){
      state.keyword = action.payload;
   },
   setPage(state,action){
      state.page = action.payload;
   },
   setCategory(state,action){
    state.category = action.payload;
   },
   setPrice(state,action){
    state.price = action.payload;
   }
  }
})

export const {setKeyword,setCategory,setPage,setPrice} = productSlice.actions;
export default productSlice.reducer;
