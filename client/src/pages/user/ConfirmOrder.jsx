import React from "react";
import CheckoutSteps from "../../components/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../../components/layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";



const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate  = useNavigate();
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.state}, ${shippingInfo?.pinCode}, ${shippingInfo?.country}`;

  const proceedToPayment = async () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("order_info", JSON.stringify(data));

    navigate("/payment/process");
  


  };

  return (
    <>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Typography variant="h6" className="mb-4 text-gray-800">
                Shipping Info
              </Typography>
              <div className="space-y-4">
                <div className="flex items-center">
                  <p className="font-semibold w-32">Name:</p>
                  <span>{user?.name}</span>
                </div>
                <div className="flex items-center">
                  <p className="font-semibold w-32">Phone:</p>
                  <span>{shippingInfo?.phoneNo}</span>
                </div>
                <div className="flex items-start">
                  <p className="font-semibold w-32">Address:</p>
                  <span>{address}</span>
                </div>
              </div>
            </div>
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <Typography variant="h6" className="mb-4 text-gray-800">
                Your Cart Items:
              </Typography>
              <div className="space-y-4">
                {cartItems &&
                  cartItems.map((item) => (
                    <div key={item._id} className="flex items-center space-x-4">
                      <img src={item.images[0].url} alt="Product" className="w-16 h-16 object-cover rounded-md" />
                      <div>
                        <Link to={`/product/${item._id}`} className="text-blue-600 hover:underline">
                          {item.name}
                        </Link>{" "}
                        <span>
                          {item.quantity} X ₹{item.price} ={" "}
                          <b>₹{item.price * item.quantity}</b>
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="md:col-span-1 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Typography variant="h6" className="mb-4 text-gray-800">
                Order Summary
              </Typography>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p className="font-semibold">Subtotal:</p>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Shipping Charges:</p>
                  <span>₹{shippingCharges}</span>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">GST:</p>
                  <span>₹{tax}</span>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Total:</p>
                  <span>₹{totalPrice}</span>
                </div>
              </div>
              <div className="mt-6">
                <Button
                  variant="contained"
                  color="primary"
                  className="w-full"
                  onClick={proceedToPayment}
                >
                  Proceed To Payment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
