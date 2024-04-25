import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeItemFromCart } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "@mui/material";

function CartItem({ item }) {
  const dispatch = useDispatch();
  const [quantity,setQuantity] = useState(item.quantity);


  const increaseQuantity = ()=>{
    
    if(quantity>=item.product?.Stock) return;
    setQuantity(prevQuantity=>prevQuantity+1);
 }

 const decreaseQuantity  = ()=>{
   if(quantity<=1) return;
   setQuantity(prevQuantity=>prevQuantity-1);
 }

 const removeItemHandler = (product)=>{
    dispatch(removeItemFromCart(product));
    toast.success("Item removed");

 }
  
  return (
    <div
      key={item.product}
      className="flex justify-between items-center mb-4 border-b border-gray-300 py-2"
    >
      <div className="flex items-center justify-between mb-4">
        <img
          src={item.images[0].url}
          alt={item.name}
          className="w-20 h-20 object-cover mr-4"
        />
        <div className="flex flex-col">
          <Link to={`/product/${item.product}`} className="text-blue-500">
            {item.name}
          </Link>
          <span>{`Price: ₹${item.price}`}</span>
          <Button
          variant = "outlined"
          color = "error"
            onClick={()=>removeItemHandler(item.product)}
           
          >
            Remove
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Button
         variant = "outlined"
         
          onClick={decreaseQuantity}
        >
          -
        </Button>
        <input
          type="number"
          value={quantity}
          readOnly
          className="w-10 text-center mx-2 border border-gray-300"
        />
        <Button
          variant = "outlined"
         
          onClick={increaseQuantity}
        >
          +
        </Button>
      </div>
      <p className="w-1/6 text-center">{`₹${
        item.price * item.quantity
      }`}</p>
    </div>
  );
}

export default CartItem;
