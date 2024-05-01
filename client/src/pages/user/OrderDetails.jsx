import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import MetaData from "../../components/layout/MetaData";
import Loader from "../../components/loaders/PageLoader";
import toast from "react-hot-toast";
import { getOrderDetails } from "../../redux/slices/orderDetailsSlice";

const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id]);

  return (
    <>
      <MetaData title="Order Details" />
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto py-8 px-5">
          <Typography variant="h4" gutterBottom>
            Order #{order && order._id}
          </Typography>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/2">
              <div className="border p-4 rounded-md">
                <Typography variant="h6" gutterBottom>
                  Shipping Info
                </Typography>
                <Typography>Name: {order.user && order.user.name}</Typography>
                <Typography>Phone: {order.shippingInfo && order.shippingInfo.phoneNo}</Typography>
                <Typography>
                  Address:{" "}
                  {order.shippingInfo &&
                    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                </Typography>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="border p-4 rounded-md">
                <Typography variant="h6" gutterBottom>
                  Payment
                </Typography>
                <Typography>
                  Status:{" "}
                  <span className={order.paymentInfo && order.paymentInfo.status === "succeeded" ? "text-green-500" : "text-red-500"}>
                    {order.paymentInfo && (order.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID")}
                  </span>
                </Typography>
                <Typography>Amount: ₹{order.totalPrice && order.totalPrice}</Typography>
              </div>
            </div>
          </div>
          <div className="border p-4 rounded-md mt-4">
            <Typography variant="h6" gutterBottom>
              Order Status
            </Typography>
            <Typography className={order.orderStatus === "Delivered" ? "text-green-500" : "text-red-500"}>
              {order.orderStatus}
            </Typography>
          </div>
          <div className="border p-4 rounded-md mt-4">
            <Typography variant="h6" gutterBottom>
              Order Items
            </Typography>
            {order.orderItems &&
              order.orderItems.map((item) => (
                <div key={item.product} className="flex items-center mb-4">
                  <img src={item.image} alt="Product" className="w-16 h-16 object-cover mr-4 rounded-md" />
                  <div>
                    <Link to={`/product/${item.product}`} className="text-blue-500 hover:underline">
                      {item.name}
                    </Link>{" "}
                    <span className="text-gray-700">
                      {item.quantity} X ₹{item.price} = <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
