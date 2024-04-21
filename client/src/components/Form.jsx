import { Button } from '@mui/material'
import React from 'react'
import ButtonLoader from "./loaders/ButtonLoader";

function Form({title,buttonText,onSubmit,children,buttonDisable}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {title}
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={onSubmit}>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="rounded-md shadow-sm space-y-4">

          {children}

        </div>

        <div className='text-center'>
          <Button
            type="submit"
            variant='contained'
            sx = {{width:"50%"}}
            disabled = {buttonDisable}
           
          >
           {
            buttonDisable?(
              <ButtonLoader/>
            ):(
              buttonText
            )
           }
          </Button>
        </div>
      </form>
    
    </div>
  </div>
  )
}

export default Form
