import { Slider, Typography } from '@mui/material'
import React from 'react'


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
