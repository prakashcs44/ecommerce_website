import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../components/layout/MetaData";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { getOrderDetails } from "../../state/slices/orderDetailsSlice";
import Loader from "../../components/loaders/PageLoader";
import toast from "react-hot-toast";

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
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Order Details" />
          <div className="container mx-auto py-8 px-5">
            <Typography variant="h4" className="mb-6">
              Order #{order && order._id}
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Typography variant="h6" className="mb-2">
                  Shipping Info
                </Typography>
                <div className="grid grid-cols-1 gap-2">
                  <div>
                    <Typography>Name:</Typography>
                    <p className="text-gray-700">{order.user && order.user.name}</p>
                  </div>
                  <div>
                    <Typography>Phone:</Typography>
                    <p className="text-gray-700">{order.shippingInfo && order.shippingInfo.phoneNo}</p>
                  </div>
                  <div>
                    <Typography>Address:</Typography>
                    <p className="text-gray-700">
                      {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <Typography variant="h6" className="mb-2">
                  Payment
                </Typography>
                <div>
                  <Typography>Status:</Typography>
                  <p
                    className={`font-semibold ${
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {order.paymentInfo &&
                      (order.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID")}
                  </p>
                </div>
                <div>
                  <Typography>Amount:</Typography>
                  <p className="text-gray-700">{order.totalPrice && order.totalPrice}</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Typography variant="h6" className="mb-2">
                Order Status
              </Typography>
              <div>
                <p
                  className={`font-semibold ${
                    order.orderStatus === "Delivered"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {order.orderStatus}
                </p>
              </div>
            </div>
            <div className="mt-8">
              <Typography variant="h6" className="mb-2">
                Order Items
              </Typography>
              <div>
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product} className="flex items-center mb-4">
                      <img
                        src={item.image}
                        alt="Product"
                        className="w-16 h-16 object-cover mr-4 rounded-md"
                      />
                      <div>
                        <Link
                          to={`/product/${item.product}`}
                          className="text-blue-500 hover:underline"
                        >
                          {item.name}
                        </Link>{" "}
                        <span className="text-gray-700">
                          {item.quantity} X ₹{item.price} ={" "}
                          <b>₹{item.price * item.quantity}</b>
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetails;
