import React, { useEffect, useState } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/user/Products";
import Auth from "./pages/user/Auth.jsx";
import {useDispatch} from "react-redux";
import { loadUser } from "./redux/slices/userSlice";
import Profile from "./pages/user/Profile.jsx";
import UserProtectedRoute from "./components/route/UserProtectedRoute.jsx";
import  UpdateProfile  from "./pages/user/UpdateProfile.jsx";
import ChangePassword from "./pages/user/ChangePassword.jsx";
import ForgotPassword from "./pages/user/ForgotPassword.jsx";
import ResetPassword from "./pages/user/ResetPassword.jsx";
import Cart from "./pages/user/Cart.jsx";
import Shipping from "./pages/user/Shipping.jsx";
import ConfirmOrder from "./pages/user/ConfirmOrder.jsx";
import {Toaster} from "react-hot-toast";
import { getCartItems } from "./redux/slices/cartSlice.js";
import { loadStripe } from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import axiosClient from "./axiosClient.js";
import Payment from "./pages/user/Payment.jsx"
import PaymentSuccess from "./pages/user/PaymentSuccess.jsx";
import Orders from "./pages/user/Orders.jsx";
import OrderDetails from "./pages/user/OrderDetails.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import DashBoard from "./pages/admin/DashBoard.jsx";
import AdminRoute from "./components/route/AdminRoute.jsx";
import ProductsAll from "./pages/admin/ProductsAll.jsx";
import CreateProduct from "./pages/admin/CreateProducts.jsx"
import OrdersAll from "./pages/admin/OrdersAll.jsx";
import UsersAll from "./pages/admin/UsersAll.jsx";
import UpdateOrderAdmin from "./pages/admin/UpdateOrder.jsx";
import UpdateUserAdmin from "./pages/admin/UpdateUser.jsx";
import UpdateProductAdmin from "./pages/admin/UpdateProduct.jsx";

function App() {

  

  const dispatch = useDispatch();
  const [stripeApiKey,setStripeApiKey] = useState();

  const getStripeApiKey = async ()=>{

    const res  = await axiosClient.get("/payment/stripeapikey");

    const {stripeApiKey} = res.data;
    setStripeApiKey(stripeApiKey);
  }

  useEffect(()=>{
     dispatch(loadUser());
     dispatch(getCartItems());
     getStripeApiKey();
  },[])


  

  return (
    <div className="relative flex flex-col h-screen">
      <Header />
      <div className=" pt-20 flex-1">
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/product/:id" element = {<ProductDetails/>}/>
        <Route path="/products" element = {<Products/>}/>
        
        <Route path="/auth" element = {<Auth/>}/>

        <Route element = {<UserProtectedRoute/>}>
        
        <Route path="/account" element={<Profile/>}/>
        <Route path="/edit-profile" element = {<UpdateProfile/>}/>
        <Route path="/password/update" element = {<ChangePassword/>}/>
         <Route path = "/orders" element = {<Orders/>}/>
         <Route path = "/order/:id" element = {<OrderDetails/>}/>
        {stripeApiKey && (
      <Route path="/payment/process" element={<Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements>} />
    )}


        </Route>


        <Route element = {<AdminRoute/>}>
          <Route path = "/admin/dashboard" element = {<DashBoard/>}/>
          <Route path = "/admin/products" element = {<ProductsAll/>}/>
          <Route path = "/admin/product/create" element = {<CreateProduct/>}/>
          <Route path = "/admin/users" element = {<UsersAll/>}/>
          <Route path = "/admin/orders" element = {<OrdersAll/>}/>
          <Route path = "/admin/order/:id" element = {<UpdateOrderAdmin/>}/>
          <Route path = "/admin/user/:id" element = {<UpdateUserAdmin/>}/>
          <Route path = "/admin/product/:id" element = {<UpdateProductAdmin/>}/>
        </Route>

        <Route path = "/payment/success" element = {<PaymentSuccess/>}/>
        <Route path = "/payment/failure" element = {<h1>failure</h1>}/>
        <Route path = "/shipping" element = {<Shipping/>}/>
        <Route path="/password/forgot" element = {<ForgotPassword/>}/>
        <Route path="/password/reset/:token" element = {<ResetPassword/>}/>
        <Route path="/cart" element = {<Cart/>}/>
        <Route path="/order/confirm" element = {<ConfirmOrder/>}/>
        <Route path="*" element = {<PageNotFound/>}/>
      </Routes>
      </div>
      <Footer />
      <Toaster/>
    </div>
  );
}

export default App;
