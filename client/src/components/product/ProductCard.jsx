import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';




function Product({ product }) {

 
   
   

    const ratingOptions = {
        value:product?.ratings,
        readOnly:true,

    }
    
   
    


    return (
        <Link className="product-Card flex flex-col justify-center items-center bg-white rounded-lg shadow-md p-4 transition duration-300 ease-in-out transform hover:scale-105 px-8" to={`/product/${product?._id}`}>
            <img className=" max-w-96 h-96 mb-4" src={product?.images[0]?.url} alt={product?.name} />
            <p className="text-lg font-semibold text-gray-800 mb-2">{product?.name}</p>
            <div className="flex items-center">
                <Rating {...ratingOptions}/>
                <span className="text-gray-600 ml-2">{product?.numOfReviews}</span>
            </div>
            <span className="text-xl font-bold text-gray-700">{`₹${product?.price}`}</span>
        </Link>
    );
}

export default Product;




