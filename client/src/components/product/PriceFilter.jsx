import { Slider, Typography } from '@mui/material'
import React from 'react'


function PriceFilter({max,min,value,onChange,onChangeCommitted}) {


 

  return (
    <div className='flex flex-col items-center gap-10'>
        <Typography variant='h5'>Price Range</Typography>
        <div className='flex gap-8 px-4 items-center justify-center'>
          <Typography color="primary">₹{value[0]}</Typography>
        <Slider
      value={value}
      sx = {{width:"100px"}}
      onChange={(event,value)=>onChange(value)}
      onChangeCommitted={(event,value)=>onChangeCommitted(value)}
      valueLabelDisplay="auto"
      min={min}
      max={max}
     
      />
        <Typography color="primary">₹{value[1]}</Typography>
        </div>
    
    </div>
  )
}

export default PriceFilter
