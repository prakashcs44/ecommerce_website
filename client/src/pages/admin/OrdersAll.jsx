import React, { useEffect, useState } from 'react';
import { Button} from '@mui/material';
import { Delete,Update } from '@mui/icons-material';
import toast from 'react-hot-toast';
import {  useNavigate } from 'react-router-dom';
import { getAllOrders, deleteOrder } from '../../redux/api/ordersAdmin';
import NothingToShow from '../../components/NothingToShow';



function OrdersAll() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getAllOrders();
        setOrders(res);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (orderId) => {
    setLoading(true);
    try {
      await deleteOrder(orderId);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      toast.success('Order deleted successfully');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  
  function handleUpdate(orderId) {
    navigate(`/admin/order/${orderId}`);
}



  if (orders.length === 0) {
    return (
     <NothingToShow title = "No Orders" />
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-center pb-6 border-b-2">All Orders</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white p-4 shadow-md rounded-lg pt-8">
            <h2 className="text-lg font-semibold mb-2">Order ID: {order._id}</h2>
            <p className="text-gray-600 mb-2">Total: ${order.totalPrice}</p>
            <p className="text-gray-600 mb-4">Status: {order.ordertatus}</p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outlined"
                color="error"
                startIcon={<Delete />}
                onClick={() => handleDelete(order._id)}
                disabled={loading}
              >
                Delete
              </Button>

              <Button
                variant="outlined"
                color="primary"
                startIcon={<Update />}
                onClick={() => handleUpdate(order._id)}
                className="ml-2"
                disabled = {loading}
              >
                Update
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersAll;
