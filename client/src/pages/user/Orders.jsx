import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {  myOrders } from "../../redux/slices/orderSlice";

import { Link } from "react-router-dom";

import MetaData from "../../components/layout/MetaData";
import { Typography } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";

import IconButton from '@mui/material/IconButton';
import NothingToShow from "../../components/NothingToShow";
import PageLoader from "../../components/loaders/PageLoader";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { status, orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
   
    dispatch(myOrders());
  }, []);

   if(status==="loading"){
    return (
      <PageLoader/>
    )
   }

  return (
    <>
      <MetaData title={`${user.name} - Orders`} />
      {orders && orders.length > 0 ? (
          <div className="flex flex-col gap-8 items-center">
            <Typography variant="h4" className="text-center text-2xl w-[50vw] my-10 mx-auto border-b-2 py-5">Your orders</Typography>
            <div className="grid grid-cols-4 gap-4">
              {orders.map(order => (
                <div key={order._id} className="p-4 bg-white shadow-md rounded-md">
                  <div>ID: {order._id}</div>
                  <div>Status: {order.orderStatus}</div>
                  <div>Items Quantity: {order.orderItems.length}</div>
                  <div>Amount: {order.totalPrice}</div>
                  <div className="flex justify-center">
                    <IconButton
                      component={Link}
                      to={`/order/${order._id}`}
                      aria-label="view-order"
                    >
                      <LaunchIcon />
                    </IconButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <NothingToShow title = "No Orders" redirect = "/cart" redirectTitle="View Cart"/>
          
        )}
    </>
  );
};

export default MyOrders;
