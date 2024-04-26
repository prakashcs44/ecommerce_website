import React from "react";
import { useDispatch } from "react-redux";
import { removeItemFromCart } from "../redux/slices/cartSlice";
import toast from "react-hot-toast";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function CartItem({ item }) {
  const dispatch = useDispatch();

  const removeItemHandler = (product) => {
    dispatch(removeItemFromCart(product));
    toast.success("Item removed");
  };

  return (
    <div className="flex py-6 px-4">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item?.images?.[0].url}
          alt={item?.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a href="#">{item?.name}</a>
            </h3>
            <p className="ml-4">₹ {item?.price}</p>
          </div>
         
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty {item?.quantity}</p>
          <IconButton
           color = "error"
           onClick={()=>removeItemHandler(item?.product)}
          >
            <DeleteIcon/>
          </IconButton>
         
        </div>
      </div>
    </div>
  );
}

export default CartItem;
