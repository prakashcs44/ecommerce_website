import React, { useEffect, useRef } from "react";
import CheckoutSteps from "../../components/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../components/layout/MetaData";
import { Button, Typography } from "@mui/material";
import toast from "react-hot-toast";

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axiosClient from "../../axiosClient";

import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { createOrder } from "../../state/slices/orderSlice";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("order_info"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.order);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const link = "/payment/process";
      const { data } = await axiosClient.post(
       link,
        paymentData,
        {withCredentials:true}
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          navigate("/payment/success");
        } else {
          toast.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error!=="") {
      toast.error(error);
      
    }
  }, [dispatch, error]);

  return (
    <>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="w-1/2 mx-auto shadow-md flex justify-center my-8 py-5">
        <form onSubmit={(e) => submitHandler(e)} className="w-full max-w-sm">
          <Typography variant="h6" className="mb-4 text-center py-5">Card Info</Typography>
          <div className="mb-4 flex items-center">
            <CreditCardIcon className="mr-2" />
            <CardNumberElement className="p-2 border rounded-md focus:outline-none focus:border-indigo-500 w-full" />
          </div>
          <div className="mb-4 flex items-center">
            <EventIcon className="mr-2" />
            <CardExpiryElement className="p-2 border rounded-md focus:outline-none focus:border-indigo-500 w-full" />
          </div>
          <div className="mb-4 flex items-center">
            <VpnKeyIcon className="mr-2" />
            <CardCvcElement className="p-2 border rounded-md focus:outline-none focus:border-indigo-500 w-full" />
          </div>
          <Button
            type="submit"
            ref={payBtn}
            variant="contained"
            fullWidth
          >
            Pay - ₹{orderInfo && orderInfo.totalPrice}
          </Button>
        </form>
      </div>
    </>
  );
};

export default Payment;
