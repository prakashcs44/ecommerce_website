import React from 'react';
import { Error } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function SomethingWentWrong() {
    return (
        <div className="bg-gray-100 h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md flex items-center justify-center flex-col space-y-4">
                <Error className="text-red-500 text-5xl" />
                <h1 className="text-2xl font-semibold text-gray-800">Something Went Wrong!</h1>
                <p className="text-gray-600">Sorry, something went wrong while processing your request. Please try again later.</p>
            </div>
        </div>
    );
}

export default SomethingWentWrong;
