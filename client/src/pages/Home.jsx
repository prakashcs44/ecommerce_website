import React,{useEffect} from 'react';
import Product from '../components/product/ProductCard';
import { CgMouse } from 'react-icons/cg';
import MetaData from '../components/layout/MetaData';
import {useDispatch,useSelector} from "react-redux";
import { getProducts } from '../state/slices/productSlice';
import Loader from '../components/loaders/PageLoader';



function Home() {


  const {loading,products,error} =  useSelector(state=>state.product);
  const dispatch =  useDispatch();
  
  

  useEffect(()=>{
    dispatch(getProducts({}));
  },[])


  if(loading) return (
   <Loader/>
  );

  return (
    <>
    <MetaData title={"home page"}/>
    <div className="bg-gradient-to-b from-blue-500 to-green-500 min-h-screen flex flex-col justify-center items-center text-white ">
      <p className="text-3xl mb-4">Welcome to Ecommerce</p>
      <h1 className="text-5xl font-bold mb-8 text-center">Find amazing products below</h1>
      <a href='#featured-products'>
        <button className=" text-gray-800 py-2 px-4 rounded hover:bg-gray-200 transition-colors duration-300 border flex items-center gap-1">
          Scroll   <CgMouse/>
        </button>
      </a>
    </div>
    <h2 className='text-center text-2xl w-[50vw] my-10 mx-auto border-b-2 py-5'>Featured products</h2>
    <div className='w-[90vw] flex flex-wrap gap-10 justify-center mx-auto' id='featured-products'>
       {products?.map(product=>(
          <Product product={product} key={product?._id}/>
       ))}
    </div>
    </>
  );
}

export default Home;
