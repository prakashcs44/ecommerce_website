import React from 'react'
import {Typography } from '@mui/material';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { Link } from 'react-router-dom';
function NothingToShow({title,redirect,redirectTitle}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <NotInterestedIcon className="text-4xl text-gray-500 mb-4" />
      <Typography variant="h5" className="text-gray-500 mb-4">
        {title}
      </Typography>
      {
        redirect&&
        (
      <Link to={redirect} className="text-blue-500">
        {redirectTitle}
      </Link>
        )
      }
    </div>
  )
}

export default NothingToShow
