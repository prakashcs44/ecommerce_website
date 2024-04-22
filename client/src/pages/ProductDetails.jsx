import React, { useEffect, useState } from 'react';
import Carousel from '../components/product/Carousel';
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from '../state/slices/productDetailsSlice';
import { useParams } from "react-router-dom";
import Loader from "../components/loaders/PageLoader";
import Rating from "../components/product/Rating";
import ReviewCard from '../components/ReviewCard';
import MetaData from '../components/layout/MetaData';
import {addItemToCart} from "../state/slices/cartSlice";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import axiosClient from '../axiosClient';

function ProductDetails() {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(state => state.productDetails);
  const { id } = useParams();
  const [quantity,setQuantity] = useState(1);
  const [rating,setRating] = useState(0);
  const [comment,setComment] = useState("");
  const [open,setOpen] = useState(false);
  const [reviewAddedToggle,setReviewAddedToggle] = useState(false);
  const increaseQuantity = ()=>{
    
     if(quantity>=product?.Stock) return;
     setQuantity(prevQuantity=>prevQuantity+1);
  }

  const decreaseQuantity  = ()=>{
    if(quantity<=1) return;
    setQuantity(prevQuantity=>prevQuantity-1);
  }


  const addToCartHandler = ()=>{
    dispatch(addItemToCart({productId:id,quantity}));
    toast.success("Product added to cart");
   

  }

  const ratingOptions = {
    defaultValue:product?.rating||0,
    readOnly:true,

  }

  const submitReviewHandler = ()=>{
    setOpen(true);
  }


  const dialogClose= ()=>{
    setOpen(false);
  }

  const cancelReview = ()=>{
    setRating(0);
    setComment("");
    setOpen(false);
  }

  const submitReview = async ()=>{
    try{
     const link = "/product/review";
     const data = {rating,comment,productId:id};
     await axiosClient.put(link,data);
     toast.success("Review added");
     setOpen(false);
     setReviewAddedToggle((val)=>!val);

    }
    catch(err){
      toast.error(err.response.data?.message);
    }
  }


  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [reviewAddedToggle]);

  if (loading) {
   
    return <Loader />;
  }

  return (
    <>
     <MetaData title={`${product.name} - ECOMMERCE`}/>
    <div className="flex flex-col items-center justify-center py-8 gap-10 sm:flex-row">
      <div className=' max-w-[30rem] sm:w-96 mr-0 sm:mr-4'>
        {product.images&&(
           <Carousel images={product?.images} />
        )}
        
      </div>
       
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">
          <h2 className="text-xl font-bold">{product?.name}</h2>
          <p className="text-gray-500">Product # {product._id}</p>
        </div>
        
        <div className="mb-4">
          <Rating {...ratingOptions} />
          <span className="ml-2 text-gray-500">({product.numOfReviews} Reviews)</span>
        </div>

        <div className="mb-4">
          <h1 className="text-2xl font-bold">₹{product?.price}</h1>
          <div className="flex justify-center items-center mt-2">
            <button className="px-2 py-1 bg-gray-200 text-gray-700"
             onClick={decreaseQuantity}
            >
              -
            </button>
            <input readOnly className="w-12 px-2 py-1 mx-2 border border-gray-300" value={quantity} type='number'/>
            <button className="px-2 py-1 bg-gray-200 text-gray-700"
            onClick={increaseQuantity}
            >
              +
            </button>
            <button className="ml-4 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
             onClick={addToCartHandler}
            >Add to Cart</button>
          </div>
          <p className={product?.Stock>0? "text-green-500" : "text-red-500"}>
            {`Status : ${product?.Stock>0? "In Stock" : "Out of Stock"}`}
          </p>
        </div>

        <div className="mb-4">
          <p className="font-semibold">Description:</p>
          <p>{product?.description}</p>
        </div>

        <button className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
         onClick = {submitReviewHandler}
         disabled = {open}
        >
          Submit Review
        </button>
      </div>
     
      <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={dialogClose}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent >
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelReview} color="secondary">
                Cancel
              </Button>
              <Button onClick={submitReview} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
    
     

    </div>
     <div>
     <h2 className='text-center text-2xl w-[50vw] my-10 mx-auto border-b-2 py-5'>Reviews</h2>
     <div className='flex justify-center items-center gap-4 overflow-x-auto'>
     {!product?.reviews?.length&&(
       <h3>No reviews yet</h3>
     )}

     {product?.reviews?.map(review=>(
       <ReviewCard review = {review} key={review._id}/>
     ))}
   

     </div>
     
     
    </div>
    </>

  );
}

export default ProductDetails;