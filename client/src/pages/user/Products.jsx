import React, {  useEffect, useState } from 'react'
import {useSelector,useDispatch} from "react-redux";
import {getProducts} from "../../redux/slices/productSlice";
import Loader from "../../components/loaders/PageLoader";
import ProductCard from "../../components/product/ProductCard";
import Pagination from '@mui/material/Pagination';
import MetaData from "../../components/layout/MetaData"
import SearchAndFilter from '../../components/product/SearchAndFilter';


function Products() {
  const {loading,error,products,resultPerPage,productsCount} = useSelector(state=>state.product);
  const dispatch = useDispatch();
   const [keyword,setKeyword] = useState("");
   const [price,setPrice] = useState([100,40000]);
   const [category,setCategory] = useState("");
   const [page,setPage] = useState(1);
  
  

   const totalPages = resultPerPage?Math.ceil(productsCount/resultPerPage):1;

 useEffect(()=>{
  dispatch(getProducts({}));
 },[])


const pageChangeHandler = (event,value)=>{

  setPage(value);
 
  dispatch(getProducts({keyword,page:value,category,price}));
}


const searchAndFilterProps = {
    keyword,
    price,
    category,
    page,
    setCategory,
    setKeyword,
    setPage,
    setPrice,

};


  
  if(loading){
    return <Loader/>
  }



  return (
    <>

    <MetaData title={"PRODUCTS- ECOMMERCE"}/>
   
    
    <h2 className='text-center text-2xl w-[50vw] my-10 mx-auto border-b-2 py-5'>
      Products
    </h2>

     <div>
      <SearchAndFilter  {...searchAndFilterProps}/>
     </div>

    <div className='w-[90vw] flex flex-wrap gap-10 justify-center mx-auto mb-10 px-10'>
      {!products?.length&&<p className='text-lg'>No products found</p>}
      {products?.map(product=>(
       <ProductCard product={product} key={product._id}/>
      ))}
    </div>
    <div className='flex justify-center'>
      {products&&products.length>0&&productsCount>0&&(
    <Pagination count={totalPages} onChange={pageChangeHandler} color='primary' page={page}/>)
      }
    </div>
    
    </>
  )
}

export default Products
