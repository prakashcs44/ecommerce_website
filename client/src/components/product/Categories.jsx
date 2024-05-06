
import React from 'react'
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';


function Categories({categories,onChange,value}) {





  return (
   <Select
   
   className=' z-50 md:w-1/2 w-3/4'
   onChange={onChange}
   value={value}
   

   >
     {
      categories.map(c=>(<MenuItem value = {c} >{c}</MenuItem>))
     }
      </Select>
  )
}

export default Categories
