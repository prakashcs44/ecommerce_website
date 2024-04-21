import React from 'react'
import { Carousel as Tcarousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"
function Carousel({images}) {
  return (
   
      <Tcarousel>
     {images?.map(image=>(
        <img src = {image.url} key={image.url} alt='product-image'/>
     ))}
    </Tcarousel>
   
   
  )
}

export default Carousel
