import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button,Typography } from '@mui/material';
import { Delete, Update } from '@mui/icons-material';
import PageLoader from "../../components/loaders/PageLoader"
import toast from "react-hot-toast";
import {Link, useNavigate} from "react-router-dom";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import {getAllProducts,deleteProduct} from "../../redux/api/productsAdmin"
import NothingToShow from '../../components/NothingToShow';
import "../../components/layout/MetaData";


function ProductsAll() {
  

  const [products,setProducts] = useState([]);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    
    const f = async ()=>{
      setLoading(true);
      try{
        const res =  await getAllProducts();
        setProducts(res);
      }
      catch(err){
         toast.error(err.message);
      }
      finally{
        setLoading(false);
      }
    }

   f();
  },[])



  const handleDelete = async (productId)=> {
       setLoading(true);
       try{
         await deleteProduct(productId);
         setProducts(products=>products.filter(product=>product._id!=productId));
         toast.success("Product deleted successfully");
       }
      catch(err){
        toast.error(err.message);
      }
      finally{
        setLoading(false);
      }
  }  

  function handleUpdate(productId) {
      navigate(`/admin/product/${productId}`);
  }




 

  if(products&&products.length===0){
    return  (
      <NothingToShow title = "No Products" redirect="/admin/product/create" redirectTitle="Create Product"/>
    )
  }

  return (
    <>
    <MetaData title = "PRODUCTS ALL"/>
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-center pb-6 border-b-2">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product._id} className="bg-white p-4 shadow-md rounded-lg pt-8">
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">Price: ${product.price}</p>
            <p className="text-gray-600 mb-2">Stock: {product.Stock}</p>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outlined"
                color="error"
                startIcon={<Delete />}
                onClick={() => handleDelete(product._id)}
                disabled = {loading}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Update />}
                onClick={() => handleUpdate(product._id)}
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
    </>
  );

 
}

export default ProductsAll;
