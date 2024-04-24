import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch} from "react-redux";
import {getProducts} from "../../redux/slices/productSlice";
import Loader from "../../components/loaders/PageLoader";
import ProductCard from "../../components/product/ProductCard";
import Search from "../../components/product/Search"
import { useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PriceFilter from '../../components/product/PriceFilter';
import Categories from '../../components/product/Categories';
import MetaData from "../../components/layout/MetaData"
import NothingToShow from "../../components/NothingToShow";
import {categories} from "../../data/productCategories";

function Products() {
  const {loading,error,products,resultPerPage,productsCount} = useSelector(state=>state.product);
  const dispatch = useDispatch();
 
   const {keyword} = useParams();
   const [page,setPage] = useState(1);
   const [price,setPrice] = useState([0,25000]);
   const [category,setCategory] = useState();
   
   const totalPages = resultPerPage?Math.ceil(productsCount/resultPerPage):1;

   useEffect(()=>{
     dispatch(getProducts({keyword,page}));
   },[keyword])


const pageChangeHandler = (event,value)=>{

  setPage(value);
 
  dispatch(getProducts({keyword,page:value}));
}


const categoryChangeHandler = (value)=>{
  setCategory(value)
  dispatch(getProducts({keyword,page,price,category:value}));
}




  if(loading){
    return <Loader/>
  }

  if(products&&products.length==0){
    return <NothingToShow  title = "No Products" redirect="/products" redirectTitle="Go Back"/>
  }


  return (
    <>

    <MetaData title={"PRODUCTS- ECOMMERCE"}/>
   
    
    <h2 className='text-center text-2xl w-[50vw] my-10 mx-auto border-b-2 py-5'>
      Products
    </h2>

   <div className='flex flex-col items-center justify-center py-5 gap-10 sm:flex-row my-10'>
   <Search/>
    <PriceFilter 
    min={0}
    max={25000} 
    value={price} 
    onChange={(value)=>setPrice(value)}
    onChangeCommitted={(value)=>dispatch(getProducts({keyword,page,price:value}))}
    />
   <Categories 
   categories = {categories} 
   value = {category}
   onChange={categoryChangeHandler}/>
   
   </div>


    <div className='w-[90vw] flex flex-wrap gap-10 justify-center mx-auto mb-10 px-10'>
      {!products?.length&&<p>No products found</p>}
      {products?.map(product=>(
       <ProductCard product={product} key={product._id}/>
      ))}
    </div>
    <div className='flex justify-center'>
      {productsCount>0&&(
    <Pagination count={totalPages} onChange={pageChangeHandler} color='primary' page={page}/>)
      }
    </div>
    
    </>
  )
}

export default Products
