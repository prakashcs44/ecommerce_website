import React from 'react'
import StarRating from '@mui/material/Rating';
function Rating(props) {
  return (
    <div>
    <StarRating  name='half-rating' precision={0.5} {...props}/>
    </div>
  )
}

export default Rating
