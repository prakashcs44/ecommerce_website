
import React from 'react'
import Select from "react-select"


function Categories({categories,onChange,value}) {


 const options = categories?.map(c=>{
    return {value:c,label:c};
 })



  return (
   <Select
   placeholder = "category..."
   options={options}
   value={value&&{value,label:value}}
   onChange={(v)=>onChange(v?.value)}
   isClearable = {true}
   className=' z-50'

   />
  )
}

export default Categories
