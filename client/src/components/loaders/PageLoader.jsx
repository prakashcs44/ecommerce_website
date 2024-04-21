import React from 'react'
import { CircularProgress } from '@mui/material';

function Loader() {
  return (
    <div className='h-[100vh] flex justify-center items-center'>
    <CircularProgress color='inherit'/>
   </div>
  )
}

export default Loader
