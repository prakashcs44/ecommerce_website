import React from 'react';
import Rating from '../components/product/Rating';
import userImg from "../assets/default_user.jpg"

function ReviewCard({ review }) {
  console.log(review);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <img className="w-16 h-16 rounded-full object-cover mb-2" src={userImg} alt="User Avatar" />
      <p className="font-semibold mb-1">{review?.name}</p>
      <div className="flex flex-col items-center mb-1">
        <Rating  readOnly = {true} value = {review?.rating}/>
        <span className="ml-2 text-gray-600">{review?.comment} </span>
      </div>
    </div>
  );
}

export default ReviewCard;
