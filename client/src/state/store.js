import { configureStore } from '@reduxjs/toolkit'
import productReducer from "./slices/productSlice"
import productDetailsReducer from "./slices/productDetailsSlice"
import userReducer from './slices/userSlice'
import cartReducer from "./slices/cartSlice"
import orderReducer from "./slices/orderSlice"
import orderDetailsReducer from "./slices/orderDetailsSlice"

 export default configureStore({
  reducer:{
    product:productReducer,
    productDetails:productDetailsReducer,
    user:userReducer,
    cart:cartReducer,
    order:orderReducer,
    orderDetails:orderDetailsReducer,
    
  } ,
})