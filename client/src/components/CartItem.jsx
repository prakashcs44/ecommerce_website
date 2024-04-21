import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeItemFromCart } from "../state/slices/cartSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

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
          <button
            onClick={()=>removeItemHandler(item.product)}
            className="text-red-500 cursor-pointer mt-2"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button
          className="px-2 py-1 bg-gray-200 text-gray-700"
          onClick={decreaseQuantity}
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          readOnly
          className="w-10 text-center mx-2 border border-gray-300"
        />
        <button
          className="px-2 py-1 bg-gray-200 text-gray-700"
          onClick={increaseQuantity}
        >
          +
        </button>
      </div>
      <p className="w-1/6 text-center">{`₹${
        item.price * item.quantity
      }`}</p>
    </div>
  );
}

export default CartItem;
