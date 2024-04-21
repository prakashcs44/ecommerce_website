import React, { useEffect, useRef, useState } from "react";
import { TextField, Button } from "@mui/material";
import { Edit, Save, Cancel } from "@mui/icons-material";
import { getSingleOrder,updateOrder } from "../../api/ordersAdmin";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ButtonLoader from "../../components/loaders/ButtonLoader";

const SingleProductPage = () => {
  const [status, setStatus] = useState();
  const [order, setOrder] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const statusRef = useRef();

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSaveStatus = async () => {

    setLoading(true);
      
    try{
      const res = await updateOrder({id:order._id,data:{status}});
      setOrder(res);
      statusRef.current = status;
      toast.success("Order updated successfully");
    }

    catch(err){
      setStatus(statusRef.current);
      toast.error(err.message);

    }
    setEdit(false);
    setLoading(false);

    
  };

  const handleCancelStatus = () => {
    setEdit(false);
    setStatus(statusRef.current);
  };

  const handleEditStatus = () => {
    setEdit(true);
  };

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const res = await getSingleOrder(id);
      setOrder(res);
      setStatus(res.orderStatus);
      statusRef.current = res.orderStatus;
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-center pb-6 border-b-2">
          Product Details
        </h1>
        <div className="mb-4">
          <p className="font-semibold">Order ID:</p>
          <p>{order._id}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Price:</p>
          <p>{order.totalPrice}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Order Status:</p>
          {edit?(
                 <TextField
                 variant="outlined"
                 fullWidth
                 value={status}
                 onChange={handleStatusChange}
               />
          ):(
            <p>{status}</p>
          )}
         
        </div>
        <div className="flex gap-2">
          {edit ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveStatus}
                startIcon={<Save />}
                disabled = {loading}
              >
                {loading?(
                  <ButtonLoader/>
                ):(
                  "Save"
                )}
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleCancelStatus}
                startIcon={<Cancel />}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              onClick={handleEditStatus}
              startIcon={<Edit />}
            >
              Edit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
