import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar.jsx";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../api/productsAdmin.js";
import {getAllUsers} from "../../api/usersAdmin.js";
import {getAllOrders} from "../../api/ordersAdmin.js";

import Loader from "../../components/loaders/PageLoader.jsx";
import MetaData from "../../components/layout/MetaData.jsx";
import toast from "react-hot-toast";

const Dashboard = () => {

  const [products,setProducts] = useState([]);
  const [orders,setOrders] = useState([]);
  const [users,setUsers] = useState([]);
  const [loading,setLoading] = useState(false);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });



  useEffect(() => {
     
     const f = async()=>{
      setLoading(true);
        try{
          const prs = await getAllProducts();
          setProducts(prs);
          const ors = await getAllOrders();
          setOrders(ors);
          const urs = await getAllUsers();
          setUsers(urs);
         
        }
        catch(err){
           toast.error(err.message);
        }
        setLoading(false);
     }

     f();

  }, []);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });


  if(loading){
    return (
      <Loader/>
    )
  }

  return (
    <div className="flex px-8">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="flex flex-col justify-center items-center w-full">
        <Typography component="h1" className="text-3xl font-bold mb-8">
          Dashboard
        </Typography>

        <div className="grid grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <p className="text-lg font-semibold">Total Amount</p>
            <p className="text-2xl font-bold">₹{totalAmount}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <Link to="/admin/products" className="block text-center">
              <p className="text-lg font-semibold">Products</p>
              <p className="text-2xl font-bold">{products && products.length}</p>
            </Link>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <Link to="/admin/orders" className="block text-center">
              <p className="text-lg font-semibold">Orders</p>
              <p className="text-2xl font-bold">{orders && orders.length}</p>
            </Link>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <Link to="/admin/users" className="block text-center">
              <p className="text-lg font-semibold">Users</p>
              <p className="text-2xl font-bold">{users && users.length}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
