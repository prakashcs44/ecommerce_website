import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../../components/CartItem";
import MetaData from "../../components/layout/MetaData";
import { Button } from "@mui/material";
import { getCartItems } from "../../redux/slices/cartSlice";
import NothingToShow from "../../components/NothingToShow";
import PageLoader from "../../components/loaders/PageLoader";

function Cart() {
  const { cartItems,loading } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartItems());
  }, []);



  if(loading){
    return (
      <PageLoader/>
    )
  }

  if (cartItems && cartItems.length == 0) {
    return (
      <NothingToShow
        title=" No Products in Your Cart"
        redirectTitle="View Products"
        redirect="/products"
      />
    );
  }

  return (
    <>
      <MetaData title="My Cart" />

      <div className="flex-1  px-4 py-6 sm:px-6">
        <div className="flex items-start justify-center border-b-2 py-3">
          <h1 className="text-2xl font-medium text-gray-900 ">Shopping cart</h1>
        </div>

        <div className="mt-8">
          <div className="-my-6 divide-y divide-gray-200">
            {cartItems.map((item) => (
              <CartItem item={item} key={item._id} />
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>{`₹${cartItems.reduce(
            (acc, item) => acc + item.quantity * item.price,
            0
          )}`}</p>
        </div>

        <div className="text-center ">
          <Button variant="contained">
            <Link to="/shipping">Checkout</Link>
          </Button>
        </div>

        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <Button
            type="button"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            <Link to="/products">Continue Shopping</Link>

            <span aria-hidden="true"> &rarr;</span>
          </Button>
        </div>
      </div>
    </>
  );
}

export default Cart;
