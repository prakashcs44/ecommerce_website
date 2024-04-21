import { Slider, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

function PriceFilter({max,min,value,onChange,onChangeCommitted}) {


 

  return (
    <div>
        <Typography sx={{textAlign:"center"}}>Price</Typography>
      <Slider
      value={value}
      sx = {{width:"100px"}}
      onChange={(event,value)=>onChange(value)}
      onChangeCommitted={(event,value)=>onChangeCommitted(value)}
      valueLabelDisplay="auto"
      min={min}
      max={max}
     
      />
    </div>
  )
}

export default PriceFilter
