import React, { useEffect } from 'react';
import { useSelector,useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import Typography from '@mui/material/Typography';
import CartItem from "../../components/CartItem";
import MetaData from '../../components/layout/MetaData';
import { Button } from '@mui/material';
import { getCartItems } from '../../state/slices/cartSlice';


function Cart() {
  const { cartItems } = useSelector(store => store.cart);
   const dispatch = useDispatch();
  

  useEffect(()=>{
    dispatch(getCartItems())
  },[])
  

  
 
  return (
    <>
    <MetaData title="My Cart"/>
    <div className="container mx-auto px-10">
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <RemoveShoppingCartIcon className="text-4xl text-gray-500 mb-4" />
          <Typography variant="h5" className="text-gray-500 mb-4">
            No Products in Your Cart
          </Typography>
          <Link to="/products" className="text-blue-500">
            View Products
          </Link>
        </div>
      ) : (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <p className=" font-bold">Product</p>
            <p className=" font-bold flex justify-center">Quantity</p>
            <p className=" font-bold flex justify-end">Subtotal</p>
          </div>

          {cartItems.map((item) => (
            <CartItem item = {item} key={item.product}/>
          ))}

          <div className="flex justify-end items-center mt-8">
            <div className="w-1/3"></div>
            <div className="w-1/3">
              <p className="font-bold text-center">Gross Total</p>
              <p className="text-center">{`₹${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}`}</p>
            </div>
            <div className="w-1/3 flex justify-end">
              <Button 
               variant='contained'
              >
                <Link to="/shipping">Check out</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default Cart;
