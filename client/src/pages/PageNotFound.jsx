import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      <ErrorOutlineIcon sx={{ fontSize: 100, color: 'gray' }} />
      <Typography variant="h4" gutterBottom className="mt-4">
        Oops! Page not found.
      </Typography>
      <Typography variant="body1" align="center" className="text-gray-600">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Typography>
      <Link to="/">
        <Button  color="primary" className="mt-8">
          <Link to = "/products">
          Go back to Home
          </Link>
         
        </Button>
      </Link>
    </div>
  );
}

export default PageNotFound;
